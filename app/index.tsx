import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import tw from 'twrnc';

export default function Index() {
  return (
    <View style={tw`flex-1 justify-center align-center text-sm`}>
      <Text>hello</Text>
      <Link href="/login">go to login</Link>
      <Link href="/signup">go to signup</Link>
    </View>
  );
}
