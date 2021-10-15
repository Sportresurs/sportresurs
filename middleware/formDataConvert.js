import nextConnect from "next-connect";
import formidable from "formidable";

const formDataConvert = nextConnect();

formDataConvert.use(async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.multiples = true;
  form.parse(req, (err, fields, files) => {
    req.files = files;
    req.body = fields;
    next();
  });
});

export default formDataConvert;
