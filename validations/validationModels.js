const joi = require('joi');
module.exports = {
  createUser:
    joi.object({
      email: joi.string().email().required().label('email is required.'),
      password: joi.string().required().label('password is required.'),
      username: joi.string().required().label('username is required.'),
      name: joi.object(
        {
          firstName: joi.string().required().label('firstName is required'),
          lastName: joi.string().required().label('lastName is required')
        }
      ),
      address: joi.object(
        {
          city: joi.string().required().label('city is required'),
          street: joi.string().required().label('street is required'),
          number: joi.string().required().label('number is required'),
          zipCode: joi.string().required().label('number is required'),
          geolocation: joi.object({
            lat: joi.string().required().label('lat is required'),
            long: joi.string().required().label('long is required')
          })
        }
      ),
      phone: joi.string().required().label('phone is required.'),
    }),
  updateUser:
    joi.object({
      id: joi.string().required().regex(/^[0-9a-fA-F]{24}$/).label('id is required.'),
      email: joi.string().email().required().label('email is required.'),
      password: joi.string().required().label('password is required.'),
      username: joi.string().required().label('username is required.'),
      name: joi.object(
        {
          firstName: joi.string().required().label('firstName is required'),
          lastName: joi.string().required().label('lastName is required')
        }
      ),
      address: joi.object(
        {
          city: joi.string().required().label('city is required'),
          street: joi.string().required().label('street is required'),
          number: joi.string().required().label('number is required'),
          zipCode: joi.string().required().label('number is required'),
          geolocation: joi.object({
            lat: joi.string().required().label('lat is required'),
            long: joi.string().required().label('long is required')
          })
        }
      ),
      phone: joi.string().required().label('phone is required.'),
    }),
  idValidate:
    joi.object({
      id: joi.string().required().regex(/^[0-9a-fA-F]{24}$/).label('id is required.')
    }),
};
