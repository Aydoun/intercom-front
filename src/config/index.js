
//TODO: Add env Support
// const LOGIN_URI = process.env.REACT_APP_CHANGE_IBAN_URI;

const LOGIN_URI = 'login';
const REGISTER_URI = 'register';
const LOGOUT_URI = 'logout';
const PROFILE_URI = 'profile';
const PLAN_URI = 'plan/:id';


// api endpoints
const hostBase = 'http://localhost:3001/api';
export const endpoints = {
  LOGIN: `${hostBase}/user/login`,
  REGISTER: `${hostBase}/user/register`,
  PLANS: `${hostBase}/plan`,
  USER: `${hostBase}/user`,
  REPOSITORY: `${hostBase}/repository`,
};

export const appBaseURL = '/';

export const appRoutes = {
  HOME: appBaseURL,
  LOGIN: `${appBaseURL}${LOGIN_URI}`,
  REGISTER: `${appBaseURL}${REGISTER_URI}`,
  PROFILE: `${appBaseURL}${PROFILE_URI}`,
  PLAN: `${appBaseURL}${PLAN_URI}`,
  LOGOUT: `${appBaseURL}${LOGOUT_URI}`,
  USERPOINTS: `${appBaseURL}${PROFILE_URI}/points`,
};
