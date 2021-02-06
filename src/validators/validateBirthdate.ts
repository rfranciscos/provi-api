export const validadeBirthdate = (stringDate: string): boolean => {
  const regex = new RegExp(
    /^([0-9]{4})[-/](0[1-9]|1[0-2])[-/]([012][0-9]|3[01])$/,
  );
  if (!stringDate) return false;
  if (!regex.test(stringDate)) return false;
  const year = new Date(stringDate).getFullYear();
  if (year < 1900 || year > new Date().getFullYear()) return false;
  return true;
};

export const validadeFormatDate = (stringDate: string): boolean => {
  if (!stringDate || stringDate === '') return false;
  const regex = new RegExp(
    /^([0-9]{4})[-/](0[1-9]|1[0-2])[-/]([012][0-9]|3[01])$/,
  );
  if (!regex.test(stringDate)) return false;
  return true;
};
