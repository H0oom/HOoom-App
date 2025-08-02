import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthForm } from '@/src/components/Auth/AuthForm';
import Feather from '@expo/vector-icons/Feather';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function AuthScreen() {
  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 items-center justify-center px-4">
          <View className="w-full max-w-md">
            <View className="mb-12 text-center">
              <Animated.View
                entering={FadeInDown.delay(200).duration(800)}
                className="mb-6 flex items-center justify-center">
                <View className="relative">
                  <View className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-lg">
                    <Feather name="video" size={24} color="white" />
                  </View>
                  <View className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
                    <View className="h-3 w-3 rounded-full bg-black" />
                  </View>
                </View>
              </Animated.View>
              <Animated.View entering={FadeInUp.delay(400).duration(800)} className="items-center">
                <Text className="mb-3 text-5xl font-light tracking-tight text-black">hoom</Text>
                <Text className="text-lg text-gray-500">Simple. Clean. Connected.</Text>
              </Animated.View>
            </View>
            <Animated.View entering={FadeInUp.delay(600).duration(800)}>
              <AuthForm />
            </Animated.View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
