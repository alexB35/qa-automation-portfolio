const host = process.env['PARABANK_URL'] || 'http://localhost:8080';
export const BASE_URL = `${host}/parabank`;

export const URLS = {
  indexUrl: `${BASE_URL}/index.htm`,
  logoutUrl: `${BASE_URL}/logout.htm`,
  registerUrl: `${BASE_URL}/register.htm`,
  forgotLoginUrl: `${BASE_URL}/lookup.htm`,
  openAccountUrl: `${BASE_URL}/openaccount.htm`,
  overviewUrl: `${BASE_URL}/overview.htm`,
  transferUrl: `${BASE_URL}/transfer.htm`,
  billPayUrl: `${BASE_URL}/billpay.htm`,
  findTransactionsUrl: `${BASE_URL}/findtrans.htm`,
  updateProfileUrl: `${BASE_URL}/updateprofile.htm`,
  requestLoanUrl: `${BASE_URL}/requestloan.htm`,
};