import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface VideoCallControlsProps {
  isMuted: boolean;
  setIsMuted: (v: boolean) => void;
  isVideoOff: boolean;
  setIsVideoOff: (v: boolean) => void;
}

export function VideoCallControls({
  isMuted,
  setIsMuted,
  isVideoOff,
  setIsVideoOff,
}: VideoCallControlsProps) {
  return (
    <View className="flex flex-row items-center gap-10 space-x-3 rounded-xl bg-white/10 px-6 py-3 backdrop-blur-xl md:space-x-4 md:rounded-2xl md:px-8 md:py-4">
      <Pressable
        className={`h-12 w-16 items-center justify-center rounded-full md:h-14 md:w-14 ${isMuted ? 'bg-red-500 ' : 'bg-white/20 '}  border-0 px-2 text-white`}
        onPress={() => setIsMuted(!isMuted)}>
        {isMuted ? (
          <Feather name="mic-off" size={16} color="white" />
        ) : (
          <Feather name="mic" size={16} color="white" />
        )}
      </Pressable>
      <Pressable
        className={`h-12 w-16 items-center justify-center rounded-full md:h-14 md:w-14 ${isVideoOff ? 'bg-red-500 ' : 'bg-white/20 '} border-0 text-white`}
        onPress={() => setIsVideoOff(!isVideoOff)}>
        {isVideoOff ? (
          <Feather name="camera-off" size={16} color="white" />
        ) : (
          <Feather name="camera" size={16} color="white" />
        )}
      </Pressable>
      <Pressable
        className="h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white md:h-14 md:w-14"
        onPress={() => router.push('/users')}>
        <Feather name="phone-off" size={16} color="white" />
      </Pressable>
    </View>
  );
}
