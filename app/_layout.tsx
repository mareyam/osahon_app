import { Stack } from 'expo-router';
import { UserProvider } from '@/context/UserContext';

export default function Layout() {
  return (
    <UserProvider>
      <Stack initialRouteName="home" screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="login" /> */}
        {/* <Stack.Screen name="signup" /> */}
        <Stack.Screen name="home" />
      </Stack>
    </UserProvider>
  );
}

{
  /* <Stack.Group screenOptions={{ animation: 'fade' }}></Stack.Group> */
}
