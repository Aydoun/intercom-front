import Objectkeys from 'object-keys';
import { format } from 'date-fns';

const numbersMapping = {
  1000: '',
  1000000: 'K',
  1000000000: 'M',
  1000000000000: 'B',
};
const mappingKeys = Objectkeys(numbersMapping);

export const saveToken = tk => localStorage.setItem('tk', tk);
export const getToken = () => localStorage.getItem('tk');
export const clearStorage = () => localStorage.clear();
export const isLoggedIn = () => getToken() !== null;

export const formatName = name => {
  if (typeof name !== 'string') return '';

  const cleanedName = name.replace(/[|&;$%@"<>()+,]/g, "");
  const splitted = cleanedName.split(/\s/g);

  return ((splitted[0] || '').slice(0, 1) + (splitted[1] || '').slice(0, 1)).toUpperCase();
}

export const displayNumber = number => {
  const parsedNumber = parseFloat(number);
  if (isNaN(parsedNumber)) return '-';


  for (var i = 0; i < mappingKeys.length; i++) {
    const key = Number(mappingKeys[i]);
    if (parsedNumber < key) return `${Math.floor(parsedNumber / (key / 1000))}${numbersMapping[key]}`;
  }
}

export const readableDate = date => {
  if (!date || typeof date !== 'string') return '';
  
  const theDate = new Date(date);
  if (isNaN(theDate.getTime())) return '';

  return format(theDate, 'MMM dd, yyyy');
}
