import { router, useLocalSearchParams } from 'expo-router';
import { useChat } from '@/src/hooks/useChat';
import { ChatHeader } from '@/src/components/Chat/ChatHeader';
import { ChatInput } from '@/src/components/Chat/ChatInput';
import { ChatMessages } from '@/src/components/Chat/ChatMessages';
import { Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { GlobalContext } from '@/src/context';
import { AuthInstance } from '@/src/API/axios';
import { io, Socket } from 'socket.io-client';

export default function ChatScreen() {
  const { users, room_id, setRoom_id, token } = useContext(GlobalContext);
  const params = useLocalSearchParams();
  const userId = Number(params.userId);
  const user = users.find((u) => u.id === userId);
  const { message, setMessage, messages, setMessages } = useChat(userId);
  const socketRef = useRef<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);

  useEffect(() => {
    const socket = io(`${process.env.SOCKET_URL}`, {
      transports: ['websocket'],
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('successfully connect');
      setIsSocketConnected(true);
    });

    socket.on('error', (error) => {
      console.error('socket error', error);
    });

    socket.on('auth_error', () => {
      console.error('auth err');
    });

    socket.on('room_joined', (data) => {
      console.log('room join', data);
    });

    socket.on('new_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on('room_left', (data) => {
      console.log('room_left', data);
    });

    return () => {
      socket.disconnect();
    };
  }, [setMessages]);

  const connectRoom = useCallback(async () => {
    try {
      const { data } = await AuthInstance.post('/chat/session', {
        target_user_id: userId,
      });
      setRoom_id(data.room_id);
    } catch (e: any) {
      console.log('con err', e.response);
    }
  }, [userId, setRoom_id]);

  const getMassageList = useCallback(async () => {
    try {
      const { data } = await AuthInstance.get(`/chat/${room_id}/messages`);
      setMessages(data);
    } catch (e: any) {
      console.log('get err', e.response);
    }
  }, [room_id, setMessages]);

  useEffect(() => {
    connectRoom();
  }, [connectRoom]);

  useEffect(() => {
    if (!room_id) return;
    getMassageList();
  }, [room_id, getMassageList]);

  useEffect(() => {
    if (!isSocketConnected || !token || !room_id || hasJoinedRoom) return;
    socketRef.current?.emit('authenticate', { token });
    socketRef.current?.emit('join_room', { room_id });
    setHasJoinedRoom(true);
  }, [isSocketConnected, token, room_id, hasJoinedRoom]);

  const sendMessage = () => {
    if (message.trim() && socketRef.current) {
      socketRef.current.emit('send_message', {
        room_id: room_id,
        message: message,
      });
      setMessage('');
    }
  };

  if (!user) return <Text>유저를 찾을 수 없습니다.</Text>;
  else
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-white"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <View className="flex-1 flex-col">
          <ChatHeader
            user={user}
            onBack={() => {
              router.push('/users');
              setRoom_id(0);
            }}
            onCall={() => router.push(`/call/${user.id}`)}
          />
          <ChatMessages messagesData={messages} />
          <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    );
}
