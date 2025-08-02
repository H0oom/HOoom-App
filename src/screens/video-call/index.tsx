import { useLocalSearchParams } from 'expo-router';
import { users } from '@/src/types/user/mockUsers';
import { useVideoCall } from '@/src/hooks/useVideoCall';
import { VideoCallControls } from '@/src/components/Call/VideoCallControls';
import { Text, View } from 'react-native';

export function VideoCallScreen() {
  const params = useLocalSearchParams();
  const userId = Number(params?.userId || 0);
  const user = users.find((u) => u.id === userId);
  const { isMuted, setIsMuted, isVideoOff, setIsVideoOff } = useVideoCall();

  if (!user) return <View>유저를 찾을 수 없습니다.</View>;

  return (
    <View className="relative min-h-screen bg-black">
      <View className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
        <View className="w-full max-w-6xl">
          <View className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
            <View className="relative  aspect-video overflow-hidden rounded-2xl bg-gray-900 md:rounded-3xl">
              {isVideoOff ? (
                <View className="flex h-full w-full items-center justify-center">
                  <View className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-center text-2xl md:mb-4 md:h-24 md:w-24 md:text-4xl">
                    <Text>{user.avatar}</Text>
                  </View>
                  <Text className="text-center text-lg font-medium text-white md:text-xl">
                    {user.name}
                  </Text>
                </View>
              ) : (
                <View className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <View className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl md:mb-4 md:h-24 md:w-24 md:text-4xl ">
                    <Text>{user.avatar}</Text>
                  </View>
                  <Text className="text-center text-lg font-medium text-white md:text-xl">
                    {user.name}
                  </Text>
                </View>
              )}
            </View>
            <View className="relative aspect-video overflow-hidden rounded-2xl bg-gray-800 md:rounded-3xl">
              <View className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                <View className="text-center">
                  <View className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl md:mb-4 md:h-24 md:w-24 md:text-4xl">
                    <Text>👤</Text>
                  </View>
                  <Text className="text-center text-lg font-medium text-white md:text-xl">나</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="absolute bottom-6 left-1/2 -translate-x-1/2 transform md:bottom-12">
        <VideoCallControls
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          isVideoOff={isVideoOff}
          setIsVideoOff={setIsVideoOff}
        />
      </View>
      <View className="absolute left-4 top-20 md:left-8 md:top-8">
        <View className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-xl md:rounded-2xl md:px-6 md:py-3">
          <Text className="text-sm font-medium text-white md:text-base">{user.name}와 통화 중</Text>
        </View>
      </View>
    </View>
  );
}
