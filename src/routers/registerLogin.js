import express from "express";
import { hashPassword } from "../helpers/bcryptHelper.js";
import { adminRegistrationValidation } from "../middlewares/validationMiddlewares.js";
import {
  createNewAdmin,
  updateAdmin,
} from "../models/adminUser/adminUserModel.js";
import { v4 as uuidv4 } from "uuid";
import { sendAdminUserVerificationMail } from "../helpers/emailHelper.js";

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

    const verificationCode = uuidv4();

    req.body.verificationCode = verificationCode;

    // console.log(hashedPass);
    //2.call model to run save query

    const result = await createNewAdmin(req.body);

    //message:mongo connected & server running at

    //3. unique url endpoint and send that to customer

    if (result?._id) {
      console.log(result);

      sendAdminUserVerificationMail(result);

      return res.json({
        status: "success",
        message:
          "we have sent you an email,please check your email and follow the instruction to activate your account",
      });
    }

    res.json({
      status: "error",
      message: "Unable to create user atm, please try again later",
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

route.patch("/", async (req, res, next) => {
  try {
    const { email, verificationCode } = req.body;
    if (email && verificationCode) {
      console.log(req.body);
      const filter = { email, verificationCode };
      const obj = {
        status: "active",
        // verificationCode: "",
      };

      const result = await updateAdmin(filter, obj);

      if (result?._id) {
        return res.json({
          status: "success",
          message: "Your account has been activated, you may sign in now",
        });
      }
    }

    res.json({
      status: "error",
      message: "invalid or expired link",
    });
  } catch (error) {
    next(error);
  }
});

export default route;
