import axios from 'axios';
import { BASE_URL } from './constants';

const httpRequest = axios.create({
  baseURL: BASE_URL
});

export const get = async () => {
  let response = { isSuccess: true, payload: null };
  try {
    response.payload = await httpRequest.get();
    return response;
  } catch (e) {
    response.isSuccess = false;
    response.payload = e.message;
    return response;
  }
};