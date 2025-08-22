import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import UserCard from '@/src/components/Users/UserCard';
import { useContext } from 'react';
import { GlobalContext } from '@/src/context';

export default function UsersScreen() {
  const { users, ready } = useContext(GlobalContext);
  return (
    <View className="flex-1 bg-white pt-10">
      <View className="border-b border-gray-100 bg-white p-6">
        <View className="mx-auto flex w-full flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <View className="flex h-10 w-10 items-center justify-center rounded-xl bg-black">
              <Feather name="video" size={20} color="white" />
            </View>
            <Text className="text-3xl font-light tracking-tight text-black">hoom</Text>
          </View>
          <Pressable onPress={() => AsyncStorage.removeItem('accessToken')}>
            <Text>logout</Text>
          </Pressable>
          <View className="flex items-center space-x-6">
            <View className="flex items-center space-x-2">
              <View className="h-2 w-2 rounded-full bg-green-500" />
              <Text className="font-medium text-gray-600">14 online</Text>
            </View>
          </View>
        </View>
      </View>
      {ready && (
        <ScrollView className="mx-auto w-full p-6">
          <View className="mb-8 gap-5">
            <Text className="mb-6 text-xl font-medium text-black">People</Text>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </View>
        </ScrollView>
      )}
      {!ready && <ActivityIndicator size={'large'} color={'black'} />}
    </View>
  );
}
