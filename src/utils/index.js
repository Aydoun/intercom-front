export const saveToken = token => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const clearStorage = () => localStorage.clear();
export const isLoggedIn = () => localStorage.getItem('token') !== null;
