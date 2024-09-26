const Joi = require("joi");

const schema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  contact: Joi.string().required(),
});

function customerValidate(req, res, next) {
  const { fullname, email, contact } = req.body;
  const { error } = schema.validate({ fullname, email, contact });
  if (error) {
    res.status(500).json({ error: error.message });
  }
  next();
}

module.exports = customerValidate;
