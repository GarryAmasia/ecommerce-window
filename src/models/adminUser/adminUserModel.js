import AdminSchema from "./AdminUserSchema.js";

export const createNewAdmin = (obj) => {
  return AdminSchema(obj).save();
};

export const updateAdmin = (filter, obj) => {
  return AdminSchema.findOneAndUpdate(filter, obj, { new: true });
};

// export const updateVerificationCodeByUserId = (_id, verificationCode) => {
//   return AdminSchema.findByIdAndUpdate(_id, {
//     verificationCode,
//   });
// };
