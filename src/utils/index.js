import Objectkeys from 'object-keys';

export const saveToken = tk => localStorage.setItem('tk', tk);
export const getToken = () => localStorage.getItem('tk');
export const clearStorage = () => localStorage.clear();
export const isLoggedIn = () => getToken() !== null;

const numbersMapping = {
  1000: '',
  1000000: 'K',
  1000000000: 'M',
  1000000000000: 'B',
};

export const formatName = name => {
    if (typeof name !== 'string') return '';

    const cleanedName = name.replace(/[|&;$%@"<>()+,]/g, "");
    const splitted = cleanedName.split(/\s/g);

    return (splitted[0] || '').slice(0,1).trim().toUpperCase() + (splitted[1] || '').slice(0,1).trim().toUpperCase();
}

export const displayNumber = number => {
  const parsedNumber = parseFloat(number);
  if (isNaN(parsedNumber)) return '-';

  const keys = Objectkeys(numbersMapping);

  for(var i = 0; i < keys.length; i++) {
    const key = Number(keys[i]);
    if (parsedNumber < key) return `${Math.floor(parsedNumber / (key / 1000))}${numbersMapping[key]}`;
  }
}
