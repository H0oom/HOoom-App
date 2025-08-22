import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { AuthInstance } from '../API/axios';

type GlobalContextValue = {
  token: string | null;
  login: (newToken: string) => Promise<void>;
  logout: () => Promise<void>;
  ready: boolean;
  users: User[];
};

export const GlobalContext = createContext<GlobalContextValue>({
  token: null,
  login: async () => {},
  logout: async () => {},
  ready: false,
  users: [],
});

type GlobalStateProps = {
  children: ReactNode;
};

type User = {
  id: number;
  name: string;
  status: string;
};

const STORAGE_KEY = 'accessToken';

function GlobalState({ children }: GlobalStateProps) {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedToken) setToken(savedToken);
        setReady(true);
      } catch (err) {
        console.error('❌ Failed to load token:', err);
      }
    };
    getToken();

    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setReady(false);
      const { data } = await AuthInstance.get('/users');
      setUsers(data);
      setReady(true);
    } catch (e) {
      console.log(e);
      // 에러 시에도 화면이 멈추지 않도록 ready 복구
      setReady(true);
    }
  };

  // 로그인
  const login = async (newToken: string) => {
    setToken(newToken);
    await AsyncStorage.setItem(STORAGE_KEY, newToken);
    // 토큰 저장 직후 유저 목록 즉시 갱신
    await getUsers();
  };

  // 로그아웃
  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <GlobalContext.Provider value={{ token, login, logout, ready, users }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
