import Joi from "joi";

export const adminRegistrationValidation = (req, res, next) => {
  //   console.log(req.body);
  //firstly check if data is clear or not, if it is not clear then respons from here with the error mesage.
  //otherwise let express to continue executing code to the next middleware by calling next()

  const schema = Joi.object({
    fName: Joi.string().min(3).max(50).required(),
    lName: Joi.string().min(3).max(50).required(),
    dob: Joi.date(),
    phone: Joi.string().min(3).max(15).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .max(50)
      .required(),

    password: Joi.string().min(6).max(100).required(),
    address: Joi.string().allow("").max(100),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }

  next();
  //   console.log(error.message);
  //   console.log(result);
  //   next();
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .max(50)
      .required(),

    password: Joi.string().min(6).max(100).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }

  next();
  //   console.log(error.message);
  //   console.log(result);
  //   next();
};
