import axiosBase from 'axios';
import Cookies from 'js-cookie';
import { ENDPOINT } from '@todo/style'

export const AUTH_TOKEN = 'auth_token';

const headers = {
  Accept: 'application/json',
  Authorization: `${Cookies.get(AUTH_TOKEN)}`,
  'Content-Type': 'application/json'
};

const instance = axiosBase.create({
  baseURL: ENDPOINT.DOMAIN,
  headers,
});

export const axios = instance;