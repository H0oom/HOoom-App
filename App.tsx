import { StatusBar } from 'expo-status-bar';

import { Stack } from 'expo-router';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name=""
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
