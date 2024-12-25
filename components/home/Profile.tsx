import React, { useEffect, useState } from 'react';
// import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import { auth } from '@/firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import { useUser } from '@/context/UserContext';

// import LoginComp from '../auth/login/LoginComp';

interface ProfileProps {
  isCollapsed?: boolean;
  navigation?: any;
}

const Profile = ({ isCollapsed, navigation }: ProfileProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<any>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const { user: userDetails, setUser } = useUser();

  //   useEffect(() => {
  //     const user = auth().currentUser;
  //     if (user) {
  //       console.log('Display name is: ' + (user.displayName || 'N/A'));
  //       console.log('Email is: ' + (user.email || 'N/A'));

  //       if (user.displayName) {
  //         const nameParts = user.displayName.split(' ');
  //         const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
  //         const secondInitial = nameParts[1]?.charAt(0).toUpperCase() || '';
  //         setUserName(`${firstInitial}${secondInitial}`);
  //       } else if (user.email) {
  //         const firstLetter = user.email.charAt(0).toUpperCase();
  //         setUserName(firstLetter);
  //       } else {
  //         setUserName('N/A');
  //       }
  //     }
  //   }, []);

  // console.log(user);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('user isss');
      console.log(userDetails);
      // {"email": "maryaam2209@gmail.com", "familyName": "Naveed", "givenName": "Maryam", "id": "106083620475043162633", "name": "Maryam Naveed", "photo": "https://lh3.googleusercontent.com/a/ACg8ocLImEuYgBmjQ_d8obirRY-ll-XC-MWMeITVHYFvQMCiii8cOoED=s96-c"}

      if (userDetails) {
        const displayName = userDetails.name || userDetails.email || '';
        if (displayName.trim()) {
          const nameParts = displayName.trim().split(' ');
          const firstChar = nameParts[0]?.charAt(0).toUpperCase() || '';
          const lastChar =
            nameParts.length > 1
              ? nameParts[nameParts.length - 1]?.charAt(0).toUpperCase()
              : '';
          setUserName(`${firstChar}${lastChar}` || 'NA');
        } else {
          setUserName('NA');
        }
      } else {
        setUserName('NA');
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await GoogleSignin.signOut();
    router.push('/login');
    console.log('signed out');

    // auth()
    //   .signOut()
    //   .then((response) => {
    //     console.log('response :', response);
    //     Alert.alert('User signed out!');
    //     navigation.navigate('Login');
    //     setUserName('');
    //   })
    //   .catch((error) => {
    //     console.log('error :', error);
    //     Alert.alert('Not able to logout!');
    //   });
  };

  return (
    <View style={tw`relative`}>
      <TouchableOpacity
        style={tw`rounded-full bg-blue-500 w-10 h-10 flex items-center justify-center`}
        onPress={toggleDropdown}
      >
        <Text style={tw`text-white font-light text-base`}>{userName}</Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {isOpen && (
        <View
          style={tw`absolute w-48 z-10 border border-neutral-600 bg-[#2F2F2F] rounded-md shadow-lg ${
            isCollapsed ? 'right-0 top-12' : 'left-12 bottom-4'
          }`}
        >
          <TouchableOpacity style={tw`px-4 py-2 hover:bg-gray-700 rounded-lg`}>
            <Text style={tw`text-neutral-300 text-sm`}>Settings</Text>
          </TouchableOpacity>
          <View style={tw`w-full h-px bg-neutral-600 my-2`} />
          <Pressable
            onPress={handleLogout}
            style={tw`px-4 py-2 hover:bg-gray-700 rounded-lg`}
          >
            <Text style={tw`text-neutral-300 text-sm`}>Logout</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Profile;
