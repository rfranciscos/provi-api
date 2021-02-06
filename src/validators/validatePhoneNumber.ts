export const validadePhoneNumber = (phoneNumber: string): boolean => {
  if (!phoneNumber) return false;
  const regex = new RegExp(/^(\(?\d{2}\)?\s?\d{4,5}[-\s]?\d{4})$/);
  if (!regex.test(phoneNumber)) return false;
  return true;
};
