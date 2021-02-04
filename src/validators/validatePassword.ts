import * as bcrypt from 'bcrypt';

export const validatePassword = async (
  userPassword: string,
  currentPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(currentPassword, userPassword);
};
