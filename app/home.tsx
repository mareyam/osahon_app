import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import tw from 'twrnc';
import Profile from '@/components/home/Profile';
import Sidebar from '@/components/home/Sidebar';
import MainScreen from '@/components/home/MainScreen';

const Home = ({ navigation }: any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const sidebarAnimation = useRef(new Animated.Value(-screenWidth)).current; // Start off-screen

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      // Close Sidebar
      Animated.timing(sidebarAnimation, {
        toValue: -screenWidth, // Move off-screen
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsSidebarOpen(false));
    } else {
      // Open Sidebar
      setIsSidebarOpen(true);
      Animated.timing(sidebarAnimation, {
        toValue: 0, // Slide into view
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={tw`bg-[#171717] w-full h-full flex`}>
      {/* Main Screen */}
      <View style={tw`flex-auto relative`}>
        {/* Top Bar */}
        <View style={tw`absolute top-5 left-5 flex-row gap-x-2 z-10`}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Image
              source={require(`../components/public/icons/hamburger.png`)}
              style={tw`w-6 h-6 p-1 rounded-lg`}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require(`../components/public/icons/create.png`)}
              style={tw`w-6 h-6 p-1 rounded-lg`}
            />
          </TouchableOpacity>
        </View>
        <View style={tw`absolute top-5 right-5 z-10`}>
          <Profile isCollapsed={true} navigation={navigation} />
        </View>

        {/* Main Content */}
        <MainScreen />
      </View>

      {/* Sidebar Layer */}
      {isSidebarOpen && (
        <>
          {/* Background Overlay */}
          <View
            style={tw`absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20`}
          >
            {/* Close Overlay */}
            <TouchableOpacity
              style={tw`absolute top-0 left-0 w-full h-full`}
              onPress={toggleSidebar}
            />
          </View>

          <Animated.View
            style={[
              tw`absolute top-0 left-0 h-full bg-[#2F2F2F] z-30`,
              {
                width: screenWidth * 0.8, // 80% of screen width
                transform: [{ translateX: sidebarAnimation }],
              },
            ]}
          >
            <Sidebar toggleWidth={toggleSidebar} />
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default Home;
