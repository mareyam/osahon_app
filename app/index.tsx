import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import tw from 'twrnc';
import LoginComp from './login';

export default function Index() {
  return (
    <View>
      <LoginComp />
    </View>
  );
}
