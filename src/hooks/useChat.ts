import { useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { GlobalContext } from '../context';

export type Message = {
  id: number;
  user_name: string;
  message: string;
  created_at: string;
};

export function useChat(id: number) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  return {
    message,
    setMessage,
    messages,
    setMessages,
  };
}
