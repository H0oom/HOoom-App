import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { AuthInstance } from '../API/axios';
import { router } from 'expo-router';

type GlobalContextValue = {
  token: string | null;
  login: (newToken: string, myName: string) => Promise<void>;
  logout: () => Promise<void>;
  ready: boolean;
  users: User[];
  room_id: number;
  setRoom_id: Dispatch<SetStateAction<number>>;
  my_id: number;
  my_name: string;
};

export const GlobalContext = createContext<GlobalContextValue>({
  token: null,
  login: async () => {},
  logout: async () => {},
  ready: false,
  users: [],
  room_id: 0,
  setRoom_id: () => {},
  my_id: 0,
  my_name: '',
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
const MYNAME = 'my_name';

function GlobalState({ children }: GlobalStateProps) {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [my_name, setMy_name] = useState<string>('');
  const [my_id, setMy_id] = useState<number>(0);
  const [room_id, setRoom_id] = useState<number>(0);

  useEffect(() => {
    const getToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem(STORAGE_KEY);
        const my_name = await AsyncStorage.getItem(MYNAME);
        if (savedToken) setToken(savedToken);
        if (my_name) setMy_name(my_name);

        if (!savedToken) router.push('/');
        setReady(true);
      } catch (err) {
        console.error('❌ Failed to load token:', err);
      }
    };
    getToken();
    getUsers();
  }, []);

  useEffect(() => {
    if (token) getUsers();
  }, [token, my_name]);

  const getUsers = async () => {
    try {
      setReady(false);
      const { data } = await AuthInstance.get('/users');
      const userData = data.filter((item: User) => item.name !== my_name);
      setUsers(userData);
      setReady(true);
    } catch (e) {
      console.log('유저를 못불러옴', e);
      // 에러 시에도 화면이 멈추지 않도록 ready 복구
      setReady(true);
    }
  };

  // 로그인
  const login = async (newToken: string, new_name: string) => {
    setToken(newToken);
    setMy_name(new_name);

    await AsyncStorage.setItem(STORAGE_KEY, newToken);
    await AsyncStorage.setItem(MYNAME, new_name);
    // 토큰 저장 직후 유저 목록 즉시 갱신
    await getUsers();
  };

  // 로그아웃
  const logout = async () => {
    setToken(null);
    setMy_name('');
    await AsyncStorage.removeItem(STORAGE_KEY);
    await AsyncStorage.removeItem(MYNAME);
  };

  return (
    <GlobalContext.Provider
      value={{ token, login, logout, ready, users, room_id, setRoom_id, my_name, my_id }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
