import Joi from "@hapi/joi";

export function propertyObjValidation(body) {
  const propertySchema = Joi.object().keys({
    address,
    salePrice: Joi.number().positive(),
    description: Joi.string().max(200).required(),
  });

  let { error } = Joi.validate(body, propertySchema);

  if (error) {
    return error;
  } else {
    return null;
  }
}

const address = Joi.object().keys({
  street: Joi.string().required(),
  suburb: Joi.string().required(),
  state: Joi.string().required(),
  postcode: Joi.number().positive(),
});
