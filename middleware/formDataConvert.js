import nextConnect from "next-connect";
import formidable from "formidable";

const formDataConvert = nextConnect();

formDataConvert.use(async (req, res, next) => {
  const form = formidable({
    keepExtensions: true,
    multiples: true,
    maxFileSize: 50 * 1024 * 1024, // 50MB limit
  });

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      // eslint-disable-next-line no-shadow
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    req.files = files;
    req.body = fields;
    next();
  } catch (error) {
    res.status(500).end(String(error));
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default formDataConvert;
