const Joi = require("joi");

module.exports = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(8).max(50).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "uk"] },
      })
      .min(6)
      .max(50)
      .required(),
  });
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      message: "Email or Password didn`t pass the validation. Try again!",
    });
  }
  next();
};
