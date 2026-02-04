import { Constants } from "../constants/constants";

export const generatePrice = (): number => {
  return (
    Math.floor(
      Math.random() * (Constants.MAX_PRICE - Constants.MIN_PRICE + 1),
    ) + Constants.MIN_PRICE
  );
};
