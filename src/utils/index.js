export const saveToken = tk => localStorage.setItem('tk', tk);
export const getToken = () => localStorage.getItem('tk');
export const clearStorage = () => localStorage.clear();
export const isLoggedIn = () => getToken() !== null;
