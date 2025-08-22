import { GlobalContext } from '@/src/context';
import { Redirect } from 'expo-router';
import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { token, ready } = useContext(GlobalContext);
  if (!ready) {
    // 아직 AsyncStorage에서 토큰 불러오는 중이면 로딩 표시
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  if (token) {
    return <Redirect href="/users" />;
  }
  return <Redirect href="/auth" />;
}
