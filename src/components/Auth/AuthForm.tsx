import { Pressable, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export function AuthForm() {
  const [tab, setTab] = useState('login');
  return (
    <View className="w-full items-center gap-5 rounded-lg border border-gray-100 bg-white p-6 shadow-xl">
      <Text className="text-2xl">Welcome</Text>
      <Text>Sign in or create your account</Text>
      <View className="w-[70%] flex-row justify-around rounded-lg bg-gray-100 p-1">
        <Pressable
          onPress={() => setTab('login')}
          className={`w-[50%] ${tab === 'login' && 'bg-white'} rounded-lg  p-1`}>
          <Text className={`text-center ${tab === 'login' && 'bg-white'}`}>Sign In</Text>
        </Pressable>
        <Pressable
          onPress={() => setTab('register')}
          className={`w-[50%] ${tab === 'register' && 'bg-white'} rounded-lg  p-1`}>
          <Text className="text-center">Sign Up</Text>
        </Pressable>
      </View>
      {tab === 'login' && <SignInForm />}
      {tab === 'register' && <SignUpForm />}
    </View>
  );
}
