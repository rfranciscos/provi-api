import { Address, CepResponseDto } from '@dto';

export const validateAddress = (
  address: Address,
  apiData: CepResponseDto,
): boolean => {
  let status = true;
  Object.keys(address).forEach((property) => {
    if (
      property !== 'complement' &&
      property !== 'number' &&
      address[property] !== apiData[property]
    ) {
      status = false;
    }
  });
  return status;
};
