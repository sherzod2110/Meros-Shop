import bcrypt from "bcrypt";

export const hashpassword = (password: string) => {
  const HASH: string = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, HASH);
};
