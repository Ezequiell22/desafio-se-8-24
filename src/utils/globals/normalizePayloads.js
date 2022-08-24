import { validatePayload } from '../validations/Validation.js';
import { trim } from 'ramda';

export const normalizePayloadUser = (payload) => {
  let newPayload = {};
  let pay = validatePayload(payload);

  for (let key in pay) {
    switch (key) {
      case 'name':
        newPayload[key] = pay[key];
        break;
      case 'role':
        newPayload[key] = pay[key];
        break;
      case 'active':
        newPayload[key] = pay[key];
        break;
      case 'cpf':
        newPayload[key] = pay[key];
        break; 
      default:
        break;
    }
  }
  return newPayload;
};

export const normalizePayloadValue = (payload) => {
  let newPayload = {};
  let pay = validatePayload(payload);

  for (let key in pay) {
    switch (key) {
      case 'type':
        newPayload[key] = pay[key];
        break;
      case 'description':
        newPayload[key] = pay[key];
        break;
      case 'value':
        newPayload[key] = pay[key];
        break;
      case 'id_user':
        newPayload[key] = trim(pay[key]);
        break;
      default:
        break;
    }
  }
  return newPayload;
};
