import {
    formatName,
    displayNumber,
    readableDate,
} from './';

test('Should returns the correct name format', () => {
    expect(formatName(null)).toEqual('');
    expect(formatName(undefined)).toEqual('');
    expect(formatName([])).toEqual('');
    expect(formatName('')).toEqual('');

    expect(formatName('Alice ')).toEqual('A');
    expect(formatName('Alice In The Wonderlerland')).toEqual('AI');
    expect(formatName('MO $Gaga')).toEqual('MG');
    expect(formatName(';;@Name %Last name')).toEqual('NL');
    expect(formatName('lady gaga')).toEqual('LG');
    expect(formatName('This Undefined')).toEqual('TU');
});

test('Should print the correct points amount', () => {
  expect(displayNumber(null)).toEqual('-');
  expect(displayNumber(undefined)).toEqual('-');
  expect(displayNumber(false)).toEqual('-');
  expect(displayNumber(true)).toEqual('-');
  expect(displayNumber([])).toEqual('-');
  expect(displayNumber('')).toEqual('-');

  expect(displayNumber(0)).toEqual('0');
  expect(displayNumber(10)).toEqual('10');
  expect(displayNumber(Math.pow(10, 3))).toEqual('1K');
  expect(displayNumber(Math.pow(10, 3) + 2)).toEqual('1K');
  expect(displayNumber(Math.pow(10, 4) + 2)).toEqual('10K');
  expect(displayNumber(Math.pow(10, 5) + 2)).toEqual('100K');

  expect(displayNumber(Math.pow(10, 6))).toEqual('1M');
  expect(displayNumber(Math.pow(10, 6) + 2)).toEqual('1M');
  expect(displayNumber(Math.pow(10, 7) + 2)).toEqual('10M');
  expect(displayNumber(Math.pow(10, 8) + 2)).toEqual('100M');
  expect(displayNumber(Math.pow(10, 8) + 2003)).toEqual('100M');

  expect(displayNumber(Math.pow(10, 9))).toEqual('1B');
  expect(displayNumber(Math.pow(10, 9) + 2)).toEqual('1B');
  expect(displayNumber(Math.pow(10, 10) + 2)).toEqual('10B');
  expect(displayNumber(Math.pow(10, 11) + 2)).toEqual('100B');

  // TODO: Number more than 100B case
});

test('Should returns the correct name format', () => {
  expect(readableDate(null)).toEqual('');
  expect(readableDate(undefined)).toEqual('');
  expect(readableDate([])).toEqual('');
  expect(readableDate('')).toEqual('');
  
  expect(readableDate('$%')).toEqual('');
  expect(readableDate('not a date random string')).toEqual('');
  expect(readableDate('22-03-2004')).toEqual('');
  
  expect(readableDate('2019-08-18T10:04:59.566')).toEqual('Aug 18, 2019');
});

