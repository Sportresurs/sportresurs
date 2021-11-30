import { withSentry, captureException } from "@sentry/nextjs";
import nc from "next-connect";
import { getSession } from "next-auth/client";
import filesToBlobs from "../../../utils/imageCompression/filesToBlobs";
import { Area, User, Purpose, PurposeArea, Image } from "../../../models";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";
import withYupSchemeValidation from "../../../middleware/withYupSchemeValidation";
import formDataConvert from "../../../middleware/formDataConvert";
import validationSchema from "../../../validationSchemas/AddCourtValidationSchema";

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
  .patch(async (req, res) => {
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
      const { id } = req.query;
      const { images } = req.files;
      const normalizedImages = !images?.length ? [images] : images;
      const compressBlob = await filesToBlobs(normalizedImages);
      const purposeArray = purpose.split(",").filter((i) => i);
      const session = await getSession({ req });
      const user = await User.findOne({ where: { email: session.user.email } });
      await Area.update(
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
        { where: { id } },
        { include: Purpose }
      );
      const newArea = await Area.findOne({ where: { id } });
      const purposeAreaItems = purposeArray.map((item) => ({
        purpose_id: item,
        area_id: newArea.dataValues.id,
      }));
      const imageItems = normalizedImages.map((img, index) => ({
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
