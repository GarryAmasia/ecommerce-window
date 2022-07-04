import bcrypt from "bcryptjs";

const salt = 10;
export const hashPassword = (plainPass) => {
  //   const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync("plainPass", salt);
};
