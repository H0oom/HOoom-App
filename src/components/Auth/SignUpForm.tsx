import { useAuthForm } from '../../hooks/useAuthForm';
import { router } from 'expo-router';
import { Text, View, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useContext, useRef, useState } from 'react';
import { baseInstance } from '@/src/API/axios';
import { GlobalContext } from '@/src/context';

export function SignUpForm() {
  const { formData, errors, handleInputChange, validateEmail, validatePassword, validateName } =
    useAuthForm();

  const [errMassage, setErrMassage] = useState('');
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const { login } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(false);
  const handleSignup = async () => {
    if (
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      validateName(formData.name || '') &&
      formData.password === formData.confirmPassword
    ) {
      try {
        setIsLoading(true);
        const { data } = await baseInstance.post('/auth/signup', {
          fullname: formData.name || '',
          email: formData.email,
          password: formData.password,
        });

        // 성공 처리
        login(data.token, data.fullname);

        router.push('/users'); // 로그인 페이지로 이동
      } catch (e: any) {
        // 에러 처리
        e.response.status === 409 && setErrMassage('이미 가입된 유저 입니다.');
        // 사용자에게 에러 메시지 표시
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View className="w-full gap-2">
      {isLoading ? (
        <View className="h-80">
          <ActivityIndicator size={'large'} color="black" />
        </View>
      ) : (
        <>
          <View className="">
            <Text className="font-medium text-black">Full Name</Text>
            <TextInput
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChangeText={(e) => handleInputChange('name', e)}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
              className={`h-14 rounded-xl border-gray-200 bg-white px-4 text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <Text className="mt-1 text-sm text-red-500">{errors.name}</Text>}
          </View>
          <View className="">
            <Text className="font-medium text-black">Email</Text>
            <TextInput
              ref={emailRef}
              id="signup-email"
              keyboardType="email-address"
              placeholder="your@email.com"
              value={formData.email}
              onChangeText={(e) => handleInputChange('email', e)}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              className={`h-14 rounded-xl border-gray-200 bg-white px-4 text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <Text className="mt-1 text-sm text-red-500">{errors.email}</Text>}
          </View>
          <View className="">
            <Text className="font-medium text-black">Password</Text>
            <TextInput
              ref={passwordRef}
              id="signup-password"
              keyboardType="default"
              placeholder="••••••••"
              value={formData.password}
              onChangeText={(e) => handleInputChange('password', e)}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              className={`h-14 rounded-xl border-gray-200 bg-white px-4 text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && (
              <Text className="mt-1 text-sm text-red-500">{errors.password}</Text>
            )}
          </View>
          <View className="">
            <Text className="font-medium text-black">Confirm Password</Text>
            <TextInput
              ref={confirmPasswordRef}
              id="confirm-password"
              keyboardType="default"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChangeText={(e) => handleInputChange('confirmPassword', e)}
              returnKeyType="done"
              onSubmitEditing={handleSignup}
              className={`h-14 rounded-xl border-gray-200 bg-white px-4 text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {errors.confirmPassword && (
              <Text className="mt-1 text-sm text-red-500">{errors.confirmPassword}</Text>
            )}
          </View>
        </>
      )}
      {errMassage && <Text className="mt-1 text-sm text-red-500">{errMassage}</Text>}
      <Pressable
        onPress={handleSignup}
        className="h-14 w-full justify-center rounded-xl bg-black px-4 text-base font-medium text-white transition-all duration-200 hover:bg-gray-800">
        <Text className="text-center text-white">Create Account</Text>
      </Pressable>
    </View>
  );
}
