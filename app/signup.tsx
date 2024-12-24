import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'expo-router';

const SignupComp = ({ navigation }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleEmailSignup = async () => {
    console.log('Clicked');
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log('Navigating to Home...');
      router.push('/home');
      console.log('Registered with:', user.email);
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is logged in:', user.email);
        // router.push('/home');
      } else {
        console.log('User is logged out');
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    // try {
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );
    //   const user = userCredential.user;
    //   console.log('Signed up with email:', user.email);
    // } catch (error: any) {
    //   console.error('Error signing up:', error.message);
    //   alert(error.message);
    // }
  };

  const handleRouteSignin = () => {
    console.log('hi');
    // navigation.navigate('Login');
  };

  async function onGoogleButtonPress() {}

  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-100 px-6`}>
      <View style={tw`w-full max-w-md p-6`}>
        <Text style={tw`text-4xl font-bold text-center mb-6`}>
          Welcome to OsahonOsime!
          {'\n'}
        </Text>

        <View>
          {/* Email Input */}
          <TextInput
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail} // Update email state
            style={tw`bg-white text-sm w-full p-3 mb-4 border rounded-lg ${
              isFocused
                ? 'border-green-500 ring-2 ring-green-500'
                : 'border-gray-300'
            }`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {/* Password Input */}
          <TextInput
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword} // Update password state
            secureTextEntry
            style={tw`bg-white text-sm w-full p-3 mb-4 border rounded-lg ${
              isFocused
                ? 'border-green-500 ring-2 ring-green-500'
                : 'border-gray-300'
            }`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {/* Confirm Password Input */}
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword} // Update confirmPassword state
            secureTextEntry
            style={tw`bg-white text-sm w-full p-3 mb-4 border rounded-lg ${
              isFocused
                ? 'border-green-500 ring-2 ring-green-500'
                : 'border-gray-300'
            }`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {/* Continue Button */}
          <Pressable
            onPress={handleEmailSignup}
            style={({ pressed }) =>
              tw.style(
                'p-3 rounded-lg',
                pressed ? 'bg-green-700' : 'bg-green-600'
              )
            }
          >
            <Text style={tw`text-white text-center font-semibold`}>
              Continue
            </Text>
          </Pressable>

          <Text style={tw`text-xs text-center text-gray-500 my-4`}>
            Already have an account?{' '}
            <Text onPress={handleRouteSignin} style={tw`text-green-500`}>
              Sign In
            </Text>
          </Text>
        </View>

        {/* OR Separator */}
        <View style={tw`flex-row items-center my-4`}>
          <View style={tw`flex-1 h-px bg-gray-300`} />
          <Text style={tw`mx-2 text-gray-500`}>OR</Text>
          <View style={tw`flex-1 h-px bg-gray-300`} />
        </View>

        {/* Social Login Buttons */}
        <View style={tw`gap-y-3`}>
          {/* Google Sign-In */}
          <Pressable
            onPress={onGoogleButtonPress}
            style={({ pressed }) =>
              tw.style(
                'flex-row items-center justify-center w-full p-3 border border-neutral-300 rounded-lg',
                pressed && 'bg-gray-200'
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

export default SignupComp;
