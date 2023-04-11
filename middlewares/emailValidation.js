const Joi = require("joi");

module.exports = (req, res, next) => {
  const schema = Joi.object({
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
      message: "Missing required field email",
    });
  }
  next();
};
