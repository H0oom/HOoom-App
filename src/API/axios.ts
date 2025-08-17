import axios from 'axios';

// 기본 설정
export const baseInstance = axios.create({
  baseURL: process.env.APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AuthInstance = axios.create({
  baseURL: process.env.APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    token: `Bearer ${''}`,
  },
});
