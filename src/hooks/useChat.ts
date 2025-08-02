import { useState } from 'react';

export type Message = {
  id: number;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
};

export function useChat(userName: string) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: userName,
      content: '안녕하세요!',
      time: '오전 1:42',
      isMe: false,
    },
    {
      id: 2,
      sender: '나',
      content: '안녕하세요! 잘 지내시나요?',
      time: '오전 1:42',
      isMe: true,
    },
    {
      id: 3,
      sender: userName,
      content: '네, 잘 지내고 있어요. 오늘 날씨가 좋네요!',
      time: '오전 1:43',
      isMe: false,
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: '나',
          content: message,
          time: '오전 1:44',
          isMe: true,
        },
      ]);
      setMessage('');
    }
  };

  return {
    message,
    setMessage,
    messages,
    sendMessage,
  };
}
