import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  },
});

// 요청마다 저장된 토큰을 헤더에 자동 주입
AuthInstance.interceptors.request.use(async (config) => {
  const storedToken = await AsyncStorage.getItem('accessToken');
  if (storedToken) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${storedToken}`;
  }
  return config;
});
