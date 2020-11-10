import axios from 'axios';
// import {
//   type UserType,
//   type ApiResponseType,
// } from '@/types';

export async function ajax({
  payload = {},
  method = 'post',
  url,
  headers,
}) {
  if (typeof payload !== 'object' || typeof url !== 'string') {
    return false;
  }
  const data = await axios({
    method: method === 'get' ? 'get' : 'post',
    url,
    ...(method === 'get'
      ? {
        params: {
          // data: encodeURIComponent(JSON.stringify(payload)),
          ...payload,
        },
      }
      : {
        data: payload,
      }),
    ...(headers ? { headers } : {}),
    // ...(responseType ? {
    //   responseType
    // } : {}),
  })
    .then((result) => result)
    .catch((err) => err);
  if (data instanceof Error) {
    throw data;
  } else {
    return data;
  }
}
