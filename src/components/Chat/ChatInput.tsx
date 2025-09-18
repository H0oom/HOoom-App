import { Pressable, Text, TextInput, View } from 'react-native';

type ChatInputProps = {
  message: string;
  setMessage: (msg: string) => void;
  sendMessage: () => void;
};

export function ChatInput({ message, setMessage, sendMessage }: ChatInputProps) {
  return (
    <View className="mb-3 border-t border-gray-100 bg-white p-6">
      <View className="mx-auto flex w-full flex-row space-x-3">
        <TextInput
          value={message}
          onChangeText={(e) => setMessage(e)}
          placeholder="메시지를 입력하세요..."
          className="h-12 flex-1 rounded-xl border-gray-200 bg-gray-50 text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black"
          keyboardType="default"
          autoCorrect={false}
          autoCapitalize="none"
          textContentType="none"
          autoComplete="off"
        />
        <Pressable onPress={sendMessage} className="justify-center rounded-xl bg-black px-6">
          <Text className="font-white text-white">전송</Text>
        </Pressable>
      </View>
    </View>
  );
}
