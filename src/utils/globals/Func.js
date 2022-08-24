import { v4 as uuidv4 } from 'uuid';
import { toString, trim } from 'ramda';
import validate from 'validator';
import crypto from 'crypto';
import moment from 'moment-timezone';

export const create_UUID = () => uuidv4();

export const units = [
  { id: 'DZ', name: 'DZ' },
  { id: 'UN', name: 'UN' },
  { id: 'KG', name: 'KG' },
  { id: '1KG', name: '1KG' },
  { id: '2KG', name: '2KG' },
  { id: '5KG', name: '5KG' },
  { id: 'KIT', name: 'KIT' },
  { id: 'PCT', name: 'PCT' },
  { id: 'POTE', name: 'POTE' },
  { id: 'LITRO', name: 'LITRO' },
  { id: 'UN 500G', name: 'UN 500G' },
  { id: 'UN 600G', name: 'UN 600G' },
  { id: 'UN 3,25KG', name: 'UN 3,25KG' },
  { id: 'UN 3,35KG', name: 'UN 3,35KG' },
];

export const transformStringReaisInFloat = (payload) =>
  parseFloat(payload.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));

export const transformFloatInReais = (value) => {
  value = toString(value);
  if (value) {
    let v = value.replace(/\D/g, '').trim();
    v = (v / 100).toFixed(2) + '';
    v = v.replace('.', ',');
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
    v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
    return `${v}`;
  }
  return '';
};

export const verifyUuid = (uuid) => {
  return validate.isUUID(uuid);
};

export const formatFloatOrNumber = (value) =>
  toString(value).includes('.') || toString(value).includes(',')
    ? value.toFixed(3)
    : value;

export const brazilJsonDate = (
  utcdateTime = new Date(),
  tz = 'America/Sao_Paulo'
) => {
  return moment(utcdateTime).tz(tz).format();
};

export const replaceSpecialChars = (str) => {
  return (
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      // .replace(/([^\w]+|\s+)/g, '-') // Substitui espaço e outros caracteres por hífen
      // .replace(/\-\-+/g, '-') // Substitui multiplos hífens por um único hífen
      .replace(/(^-+|-+$)/, '')
  ); // Remove hífens extras do final ou do inicio da string
};

export const gerarSalt = (value) => {
  return crypto
    .randomBytes(Math.ceil(value / 2))
    .toString('hex')
    .slice(0, 16);
};

export const sha512 = (senha, salt) => {
  var hash = crypto.createHmac('sha512', salt); // Algoritmo de cripto sha512
  hash.update(senha);
  var hash = hash.digest('hex');
  return {
    salt,
    hash,
  };
};

export const gerarSenha = (senha) => {
  var salt = gerarSalt(16); // Vamos gerar o salt
  var senhaESalt = sha512(senha, salt); // Pegamos a senha e o salt
  // A partir daqui você pode retornar a senha ou já salvar no banco o salt e a senha
  return senhaESalt;
};

export const login = (password, salt, hash) => {
  var senhaESalt = sha512(password, salt);
  return hash === senhaESalt.hash;
};
