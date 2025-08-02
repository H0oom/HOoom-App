import { Message } from '@/src/hooks/useChat';
import { ScrollView, Text, View } from 'react-native';

type ChatMessagesProps = {
  messages: Message[];
};

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <ScrollView
      className="flex-1 p-6"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}>
      <View className="w-full gap-5">
        {messages.map((msg) => (
          <View key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <View
              className={`max-w-xs rounded-2xl px-5 py-3 lg:max-w-md ${msg.isMe ? 'self-end bg-black text-white' : 'self-start bg-gray-100 text-black'}`}>
              <Text className={`text-base ${msg.isMe ? 'text-white' : 'text-black'}`}>
                {msg.content}
              </Text>
              <Text className={`mt-2 text-xs ${msg.isMe ? 'text-gray-300' : 'text-gray-500'}`}>
                {msg.time}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
