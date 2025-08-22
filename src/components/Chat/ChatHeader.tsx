import { AntDesign, Feather } from '@expo/vector-icons';
import { User } from '@/src/types/user/types';
import { Pressable, Text, View } from 'react-native';

type ChatHeaderProps = {
  user: User;
  onBack: () => void;
  onCall: () => void;
};

export function ChatHeader({ user, onBack, onCall }: ChatHeaderProps) {
  return (
    <View className="mt-10 border-b border-gray-100 bg-white p-6">
      <View className="mx-auto flex w-full flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-3">
          <Pressable onPress={onBack} className="rounded-xl p-2 text-black hover:bg-gray-100">
            <AntDesign name="arrowleft" color="black" size={16} />
          </Pressable>
          <View className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Text>🧑‍💻</Text>
          </View>
          <View>
            <Text className="text-lg font-medium text-black">{user.name}</Text>
            <Text className="text-sm text-gray-500">
              {user.status === 'online' ? '온라인' : '자리비움'}
            </Text>
          </View>
        </View>
        <View className="flex items-center">
          <Pressable
            onPress={onCall}
            className="flex-row items-center gap-4 rounded-xl bg-black px-4 py-2 hover:bg-gray-800">
            <Feather name="phone" size={24} color="white" />
            <Text className="text-white">통화</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
