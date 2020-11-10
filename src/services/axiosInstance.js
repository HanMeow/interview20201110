import axios from 'axios';
import {
  type ApiResponseType,
} from './apiTypes';


const instance = axios.create({});
const instanceRequest = (config) => {
  if (process.env.NODE_ENV === 'development') {
    if (config.data && Object.keys(config.data).length !== 0) {
      console.group(`%c${config.url}`, 'background: #fff; color: #2ecc71; font-size:11px;');
      const beautyData:Object = config.data
          |> JSON.stringify
          |> JSON.parse;
      console.table(beautyData);
      console.groupEnd();
    } else {
      console.log(`%c${config.url}`, 'background: #fff; color: #2ecc71; font-size:11px;');
    }
  }
  return config;
};


const errorResponseHandler = (error) => {
  if (error.response) {
    const { status, data, statusText } = error.response;
    console.error(status, statusText);
    console.log(data);
  } if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  return Promise.reject(error);
};

instance.interceptors.request.use(instanceRequest);
instance.interceptors.response.use((response) => {
  const { config, data } = response;

  const { MSG, STATUS }: ApiResponseType = data;

  if (process.env.NODE_ENV === 'development') {
    console.group(`%c 🤟 ${config.url}`, 'background: #2ecc71; color: #fff; font-size:11px;');
    const ignoreLogPath:string[] = [
    ];
    if (ignoreLogPath.indexOf(config.url) === -1) {
      const beautyData:Object = data
      |> JSON.stringify
      |> JSON.parse;
      console.table(beautyData);
    }
    console.groupEnd();
  }

  if (STATUS !== 'OK') {
    return Promise.reject(new Error(MSG));
  }

  return response.data;
}, errorResponseHandler);

export default instance;
