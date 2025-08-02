import { router } from 'expo-router';
import { useAuthForm } from '@/src/hooks/useAuthForm';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRef } from 'react';

export function SignInForm() {
  const { formData, errors, handleInputChange, validateEmail } = useAuthForm();
  const passwordRef = useRef<TextInput>(null);

  const handleLogin = () => {
    if (validateEmail(formData.email) && formData.password) {
      router.push('/users');
    }
  };

  return (
    <View className="w-full gap-5">
      <View className="gap-1">
        <Text className="font-medium text-black">Email</Text>
        <TextInput
          id="email"
          keyboardType="email-address"
          placeholder="your@email.com"
          value={formData.email}
          onChangeText={(text: string) => handleInputChange('email', text)}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          className={`h-14 rounded-xl border-gray-200 bg-white px-4 text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && <Text className="mt-1 text-sm text-red-500">{errors.email}</Text>}
      </View>
      <View className="gap-1">
        <Text className="font-medium text-black">Password</Text>
        <TextInput
          ref={passwordRef}
          id="password"
          keyboardType="default"
          placeholder="••••••••"
          value={formData.password}
          onChangeText={(text: string) => handleInputChange('password', text)}
          returnKeyType="done"
          onSubmitEditing={handleLogin}
          className={`h-14 rounded-xl border-gray-200 bg-white px-4 text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${errors.password ? 'border-red-500' : ''}`}
        />
        {errors.password && <Text className="mt-1 text-sm text-red-500">{errors.password}</Text>}
      </View>
      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.7}
        onPressIn={() => router.replace('/users')}
        className="h-14 w-full justify-center rounded-xl bg-black text-base font-medium text-white transition-all duration-200 hover:bg-gray-800">
        <Text className="text-center text-white">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
