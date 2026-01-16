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
  .post(async (req, res) => {
    try {
      const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ files, fields });
        });
      });

      if (!data.files || !data.files.images || !data.fields) {
        return res
          .status(400)
          .json({ error: "No images uploaded or required data is missing" });
      }

      // Formidable може повернути один файл як об'єкт, або масив файлів
      const images = Array.isArray(data.files.images)
        ? data.files.images
        : [data.files.images];

      const createdImages = await Promise.all(
        images.map(async (file, index) => {
          const fileData = await fs.readFile(file.filepath);
          return Image.create({
            name: file.originalFilename,
            filetype: file.mimetype,
            file: fileData,
            area_id: Number(data.fields.area_id[0]),
            order: index + 1,
            created_at: new Date(),
            updated_at: new Date(),
          });
        })
      );

      return res.status(201).json({ createdImages });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Image upload error:", error);
      return res.status(500).json({ error: error.message });
    }
  });

export default withSentry(handler);
