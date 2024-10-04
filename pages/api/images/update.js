import nextConnect from "next-connect";
import { withSentry } from "@sentry/nextjs";
import { IncomingForm } from "formidable";
import fs from "fs/promises";
import { Image } from "../../../models";
import checkAuthAdmin from "../../../middleware/checkAuthAdmin";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect()
  .use(checkAuthAdmin)
  .patch(async (req, res) => {
    try {
      const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ files, fields });
        });
      });

      if ((!data.files && !data.files.images.length) || !data.fields) {
        return res
          .status(400)
          .json({ error: "No images uploaded or required data is missing" });
      }

      // eslint-disable-next-line camelcase
      const area_id = Number(data.fields.area_id[0]);
      const lastOrder = Number(data.fields.order[0]);
      let i = lastOrder + 1;

      const createdImages = await Promise.all(
        data.files.images.map(async (file) => {
          const fileData = await fs.readFile(file.filepath);
          Image.create({
            file: fileData,
            name: file.originalFilename,
            filetype: file.mimetype,
            // eslint-disable-next-line no-plusplus
            order: i++,
            area_id,
            created_at: new Date(),
            updated_at: new Date(),
          });
        })
      );

      return res.status(200).json({ createdImages });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

export default withSentry(handler);
