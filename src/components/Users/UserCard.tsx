import React, { useState } from 'react';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

function UserCard({ user }: { user: any }) {
  const [isPressed, setIsPressed] = useState(false);
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue(0);
  const shadowOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(backgroundColor.value, [0, 1], ['#ffffff', '#f9fafb']),
      shadowOpacity: shadowOpacity.value,
      shadowRadius: 8,
      elevation: shadowOpacity.value * 4,
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isPressed ? 1 : 0, { duration: 200 }),
    };
  });

  const handlePressIn = () => {
    setIsPressed(true);
    scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
    backgroundColor.value = withTiming(1, { duration: 200 });
    shadowOpacity.value = withTiming(0.1, { duration: 200 });
  };

  const handlePressOut = () => {
    setIsPressed(false);
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    backgroundColor.value = withTiming(0, { duration: 200 });
    shadowOpacity.value = withTiming(0, { duration: 200 });
  };

  const handlePress = () => {
    router.push(`/chat/${user.id}`);
  };

  return (
    <AnimatedTouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={animatedStyle}
      className="rounded-2xl border border-gray-100 p-5">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-2">
          <View className="relative">
            <View className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
              <Text className="text-xl font-medium text-black">🧑‍💻</Text>
            </View>
            <View
              className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}
            />
          </View>
          <View>
            <Text className="text-lg font-medium text-black">{user.name}</Text>
            <Text className="text-sm text-gray-500">{user.status}</Text>
          </View>
        </View>
        <Animated.View style={iconStyle}>
          <Ionicons name="chatbubble-outline" size={20} color="gray" />
        </Animated.View>
      </View>
    </AnimatedTouchableOpacity>
  );
}

export default UserCard;
