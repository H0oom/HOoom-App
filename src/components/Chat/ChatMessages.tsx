import { GlobalContext } from '@/src/context';
import { Message } from '@/src/hooks/useChat';
import { useContext, useEffect, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';

type ChatMessagesProps = {
  messagesData: Message[];
};

export function ChatMessages({ messagesData }: ChatMessagesProps) {
  const { my_name } = useContext(GlobalContext);
  const scrollRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollToEnd({ animated: false });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesData]);

  return (
    <ScrollView ref={scrollRef} className="flex-1 gap-5 px-3">
      {messagesData.map((item, index) => {
        const isMe = item.user_name === my_name;
        const time = item.created_at?.split('T')?.[1].split('Z')?.[0];
        return (
          <View key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-3`}>
            <View
              className={`max-w-xs rounded-2xl px-5 py-3 lg:max-w-md ${
                isMe ? 'self-end bg-black text-white' : 'self-start bg-gray-100 text-black'
              }`}>
              <Text className={`text-base ${isMe ? 'text-white' : 'text-black'}`}>
                {item.message}
              </Text>
              <Text className={`mt-2 text-xs ${isMe ? 'text-gray-300' : 'text-gray-500'}`}>
                {time || item.created_at}
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
