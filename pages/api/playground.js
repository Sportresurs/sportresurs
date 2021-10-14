import { withSentry, captureException } from "@sentry/nextjs";
import nc from "next-connect";
import fs from "fs";
import { getSession } from "next-auth/client";
import compressImg from "../../utils/imageCompression/compress";
import { Area, User, Purpose, PurposeArea, Image } from "../../models";
import checkAuthAdmin from "../../middleware/checkAuthAdmin";
import withYupSchemeValidation from "../../middleware/withYupSchemeValidation";
import formDataConvert from "../../middleware/formDataConvert";
import validationSchema from "../../validationSchemas/AddCourtValidationSchema";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc()
  .use(
    formDataConvert,
    checkAuthAdmin,
    withYupSchemeValidation(validationSchema)
  )
  .post(async (req, res) => {
    try {
      const {
        number,
        district,
        address,
        type,
        purpose,
        longitude,
        latitude,
        size,
        coating,
        access,
        openTime,
        closeTime,
        light,
        additional,
        rating,
      } = req.body;
      const imgData = req.files.images;
      const blobImages = [];
      imgData.forEach((img) => {
        blobImages.push(fs.readFileSync(img.path));
      });
      const compressBlob = await Promise.all(
        blobImages.map(async (img) => compressImg(img))
      );
      const purposeArray = purpose.split(",");
      const session = await getSession({ req });
      const user = await User.findOne({ where: { email: session.user.email } });
      const newArea = await Area.create(
        {
          number,
          district,
          address,
          type,
          longitude,
          latitude,
          size,
          coating,
          access,
          open_time: openTime,
          close_time: closeTime,
          light,
          additional,
          rating,
          created_by: user.id,
        },
        { include: Purpose }
      );
      const purposeAreaItems = purposeArray.map((item) => ({
        purpose_id: item,
        area_id: newArea.dataValues.id,
      }));
      const imageItems = imgData.map((img, index) => ({
        file: compressBlob[index],
        name: img.name,
        filetype: img.type,
        order: index + 1,
        area_id: newArea.dataValues.id,
      }));
      await Image.bulkCreate(imageItems);
      await PurposeArea.bulkCreate(purposeAreaItems);
      res.status(201).json(newArea.toJSON());
    } catch (err) {
      res.json(err);
      captureException(err);
    }
  });

export default withSentry(handler);
