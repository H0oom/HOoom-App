import { router, useLocalSearchParams } from 'expo-router';
import { useChat } from '@/src/hooks/useChat';
import { ChatHeader } from '@/src/components/Chat/ChatHeader';
import { ChatInput } from '@/src/components/Chat/ChatInput';
import { ChatMessages } from '@/src/components/Chat/ChatMessages';
import { Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@/src/context';
import { AuthInstance } from '@/src/API/axios';

export default function ChatScreen() {
  const { users } = useContext(GlobalContext);
  const params = useLocalSearchParams();
  const userId = Number(params.userId);
  const user = users.find((u) => u.id === userId);
  const { message, setMessage, sendMessage } = useChat(user?.name || '', userId);
  const [ready, setReady] = useState(false);
  const [room_id, setRoom_Id] = useState();
  const [messages, setMessages] = useState([]);

  const connectChatting = async () => {
    try {
      const { data } = await AuthInstance.post('/chat/session', {
        target_user_id: userId,
      });
      setRoom_Id(data.room_id);
      setReady(true);
      console.log('connectChat ', data);
    } catch (e) {
      console.log(e);
    }
  };

  const getChatting = async () => {
    try {
      const { data } = await AuthInstance.get(`/chat/${room_id}/messages`);
      setMessages(data);
      console.log('getchat ', data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    connectChatting();
    if (ready) {
      getChatting();
    }
  }, [ready]);

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
            onBack={() => router.push('/users')}
            onCall={() => router.push(`/call/${user.id}`)}
          />
          <ChatMessages messages={messages} />
          <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    );
}
