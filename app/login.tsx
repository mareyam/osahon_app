import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'expo-router';

const LoginComp = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // router.push('/home');
      }
    });

    return unsubscribe;
  }, []);

  const handleEmailSignin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log('Logged in with:', user.email);
      router.push('/home');
    } catch (error: any) {
      alert(error.message);
    }
  };

  async function onGoogleButtonPress() {}

  const handleRouteSignup = () => {
    console.log('hi');
    router.push('/signup');
  };
  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-100 px-6`}>
      <View style={tw`w-full max-w-md p-6`}>
        <Text style={tw`text-4xl font-bold text-center mb-6`}>
          Welcome Back!
          {'\n'} Login
        </Text>

        <View>
          <TextInput
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            style={tw`bg-white text-sm w-full p-3 mb-4 border rounded-lg ${
              isFocused
                ? 'border-green-500 ring-2 ring-green-500'
                : 'border-gray-300'
            }`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <TextInput
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={tw`bg-white text-sm w-full p-3 mb-4 border rounded-lg ${
              isFocused
                ? 'border-green-500 ring-2 ring-green-500'
                : 'border-gray-300'
            }`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <Pressable
            onPress={handleEmailSignin}
            style={
              ({ pressed }) =>
                pressed
                  ? tw`p-3 bg-green-700 rounded-lg` // Darker green when pressed
                  : tw`p-3 bg-green-600 rounded-lg` // Default green
            }
          >
            <Text style={tw`text-white text-center font-semibold`}>
              Continue
            </Text>
          </Pressable>

          <Text style={tw`text-xs text-center text-gray-500 my-4`}>
            Don&apos;t have an account?{' '}
            <Text
              onPress={handleRouteSignup}
              style={tw`text-green-500 font-semibold`}
            >
              Sign Up
            </Text>
          </Text>
        </View>

        {/* OR Separator */}
        <View style={tw`flex-row items-center my-4`}>
          <View style={tw`flex-1 h-px bg-gray-300`} />
          <Text style={tw`mx-2 text-gray-500`}>OR</Text>
          <View style={tw`flex-1 h-px bg-gray-300`} />
        </View>

        <View style={tw`gap-y-3`}>
          <Pressable
            onPress={onGoogleButtonPress}
            style={({ pressed }) =>
              tw.style(
                `flex-row items-center justify-center w-full p-3 border border-neutral-300 rounded-lg`,
                pressed && `bg-gray-200`
              )
            }
          >
            <Image
              source={require('../components/public/logos/Google.png')}
              style={tw`w-6 h-6 mr-2`}
            />
            <Text style={tw`text-sm`}>Continue with Google</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginComp;
