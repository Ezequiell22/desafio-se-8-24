import { isNil, isEmpty } from 'ramda';
import jwt from 'jsonwebtoken';
import { msgGetError, msgGetSuccess } from '../message/responseRest.js';

export const validatePayload = (payload) => {
  let pay = {};
  for (let key in payload) {
    if (!isNil(payload[key])) {
      pay[key] = payload[key];
    }
  }
  return pay;
};

export const hasCpfValid = (value) => {
  let cpf = value.replace(/[^\d]+/g, '');
  if (cpf === '') return false;
  if (
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  )
    return false;
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  return true;
};

export const verifyBaererAuth = async (token, db) => {
  let profile;

  try {
    if (!isNil(token)) {
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return msgGetError('profile', 'Token invalid', 401);
        profile = decoded;
      });

      if (!profile)
        return (profile = msgGetError('profile', 'invalid credential', 401));

      await db('user')
        .select(
          'user.id',
          'user.role',
          'user.name',
          'user.cpf'
        )
        .where('user.id', profile.id)
        .then((response) => {
          if (isEmpty(response)) {
            profile = msgGetError('profile', 'invalid credential', 401);
          } else {
            profile = msgGetSuccess('profile', response[0], 200);
          }
        });
    } else {
      profile = msgGetError('profile', 'no token present', 401);
    }
  } catch (e) {
    profile = msgGetError('profile', e, 500);
  }

  return profile;
};
