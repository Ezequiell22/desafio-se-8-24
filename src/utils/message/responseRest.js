export const msg_res = (success, type, status, resp = null) => {
  const payload = {
    success,
    status,
    type,
  };

  if (success === true && resp) payload['data'] = resp;

  if (!(success === true) && resp) payload['error'] = resp;

  return payload;
};

export const msgGetSuccess = (type, response, status) => {
  let resp = {
    success: true,
    status: status,
    message: `${type} get success` + '',
  };
  resp['data'] = response;
  return resp;
};

export const msgGetError = (type, error, status) => {
  return {
    success: false,
    status: status,
    message: `search ${type} not success` + '',
    error: error,
    messageError: error + '',
  };
};

export const msgCreateSuccess = (type, status, resp = null) => {
  const payload = {
    success: true,
    status: status,
    message: `create ${type} success` + '',
  };
  if (resp) {
    payload['data'] = resp;
  }
  return payload;
};

export const msgCreateError = (type, error, status) => {
  return {
    success: false,
    status: status,
    message: `create ${type} not success` + '',
    error: error,
    messageError: error + '',
  };
};

export const msgUpdateSuccess = (type, status, resp = null) => {
  const payload = {
    success: true,
    status: status,
    message: `update ${type} success` + '',
  };
  if (resp) {
    payload['data'] = resp;
  }
  return payload;
};

export const msgUpdateError = (type, error, status) => {
  return {
    success: false,
    status: status,
    message: `update ${type} not success` + '',
    error: error,
    messageError: error + '',
  };
};

export const msgDeleteSuccess = (type, status) => {
  return {
    success: true,
    status: status,
    message: `delete ${type} success` + '',
  };
};

export const msgDeleteError = (type, error, status) => {
  return {
    success: false,
    status: status,
    message: `delete ${type} not success` + '',
    error: error,
    messageError: error + '',
  };
};

export const msgMethodError = (type, error, status) => {
  return {
    success: false,
    status: status,
    message: `get methods ${type} not found` + '',
    error: error,
    messageError: error + '',
  };
};
