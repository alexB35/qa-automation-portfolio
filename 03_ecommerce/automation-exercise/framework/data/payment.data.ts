export type PaymentData = {
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
};

export const VALID_CARD = {
  cardNumber: '4111111111111111',
  cvc: '123',
  expiryMonth: '12',
  expiryYear: '2027',
};

export const INVALID_CARD = {
  cardNumber: '4111111111111111',
  cvc: '123',
  expiryMonth: '02',
  expiryYear: '1950',
};