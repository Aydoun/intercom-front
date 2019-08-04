
//TODO: Add env Support
// const LOGIN_URI = process.env.REACT_APP_CHANGE_IBAN_URI;
const LOGIN_URI = 'login';
const REGISTER_URI = 'register';

// api endpoints
export const endpoints = {};

export const baseURL = '/';

export const appRoutes = {
  HOME: baseURL,
  LOGIN: `${baseURL}${LOGIN_URI}`,
  REGISTER: `${baseURL}${REGISTER_URI}`,
};
