import { router, useLocalSearchParams } from 'expo-router';
import { users } from '@/src/types/user/mockUsers';
import { useChat } from '@/src/hooks/useChat';
import { ChatHeader } from '@/src/components/Chat/ChatHeader';
import { ChatInput } from '@/src/components/Chat/ChatInput';
import { ChatMessages } from '@/src/components/Chat/ChatMessages';
import { Text, View, KeyboardAvoidingView, Platform } from 'react-native';

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const userId = Number(params.userId);
  const user = users.find((u) => u.id === userId);
  const { message, setMessage, messages, sendMessage } = useChat(user?.name || '');

  if (!user) return <Text>유저를 찾을 수 없습니다.</Text>;

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
