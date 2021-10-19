const withYupSchemeValidation = (yupSchema) => async (req, res, next) => {
  if (["POST", "PATCH"].includes(req.method)) {
    try {
      await yupSchema.validate(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  next();
};

export default withYupSchemeValidation;
