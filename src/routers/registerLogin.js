import express from "express";
import { hashPassword } from "../helpers/bcryptHelper.js";
import { adminRegistrationValidation } from "../middlewares/validationMiddlewares.js";
import { createNewAdmin } from "../models/adminUser/adminUserModel.js";

const route = express.Router();

// route.all("/", (req, res, next) => {
//   console.log(
//     "all the request of the api will go through this line of code, do some validation check here if needed before hiting the right method",
//   );
//   next();
// });

route.post("/", adminRegistrationValidation, async (req, res, next) => {
  try {
    console.log(req.body);
    //1.encrypt the password
    // console.time("hashing");
    // const hashedPass = hashPassword(req.body.password);
    // console.timeEnd("hashing");

    //we can overwrite real password with the one that has been encrypted:

    req.body.password = hashPassword(req.body.password);

    // console.log(hashedPass);
    //2.call model to run save query

    const result = await createNewAdmin(req.body);

    //message:mongo connected & server running at
    console.log(result);

    //3. unique url endpoint and send that to customer
    res.json({
      message: "todo",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message =
        "There is already registered user with this email, please login or try to use different email..THANK YOU";
    }
    next(error);
  }
});

export default route;
