import AdminSchema from "./AdminUserSchema.js";

export const createNewAdmin = (obj) => {
  return AdminSchema(obj).save();
};
