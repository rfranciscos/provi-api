export const validadeFullName = (fullName: string): boolean => {
  if (!fullName) return false;
  const regex = new RegExp(/[0-9]{1}/);
  if (!regex.test(fullName)) return false;
  return true;
};
