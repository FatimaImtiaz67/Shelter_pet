import React from 'react';
import {
  createDrawerNavigator,
  useDrawerProgress,
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerStatus,
  DrawerItem
} from '@react-navigation/drawer';
import { View, Image, Text, StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';
import Home from './Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from './Profile';
import Favourites from './Favourites';
import AddPet from './AddPet';
import Donation from './Donation';
import { useNavigation } from '@react-navigation/native';
const Drawer = createDrawerNavigator();

const DrawerScreenContainer = ({ children }) => {
  const isDrawerOpen = useDrawerStatus();
  const progress = useDrawerProgress();
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 25],
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: 'white',
        borderRadius,
        transform: [{ scale }],
        overflow: 'hidden',
      }}>
      {children}
    </Animated.View>
  );
};

const CustomDrawerContent = props => {
  const navigation = useNavigation();
  const handleLogout = () => {
    alert("Uesr Loged Out Successfully");
    navigation.reset({ index: 0, routes: [{ name: 'Login' }], })
  }
  return (
    <DrawerContentScrollView
      style={{
        paddingVertical: 30,
      }}>
      <View
        style={{
          marginLeft: 20,
          marginVertical: 40,
        }}>
        <Image
          source={require('./Images/cat.png')}
          style={{ height: 70, width: 70, borderRadius: 20 }}
        />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 13,
            marginTop: 10,
          }}>
          Bikash Thapa
        </Text>
      </View>

      <DrawerItemList {...props} />
      <DrawerItem
        icon={(color, size) => (
          <Icon
            name="exit-to-app"
            color={'black'}
            size={25}
          />
        )}
        label="Sign Out"
        labelStyle={{ color: 'black', fontWeight: 'bold', marginLeft: -15 }}
        onPress={() => { handleLogout() }}
      />
    </DrawerContentScrollView>
  );
};
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          width: 200,
          backgroundColor: 'red',
        },
        overlayColor: null,
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'blue',
        drawerItemStyle: { backgroundColor: null },
        sceneContainerStyle: {
          backgroundColor:'red',
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{
          title: 'ADOPTION',
          drawerIcon: ({ color }) => (
            <Icon name="paw" size={25} style={{ marginRight: -20, color }} />
          ),
        }}>
        {props => (
          <DrawerScreenContainer>
            <Home {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="DONATION"
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="gift" size={25} style={{ marginRight: -20, color }} />
          ),
        }}>
        {props => (
          <DrawerScreenContainer>
            <Donation {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="ADD PET"
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="plus-box" size={25} style={{ marginRight: -20, color }} />
          ),
        }}>
        {props => (
          <DrawerScreenContainer>
            <AddPet {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="FAVOURITES"
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="heart" size={25} style={{ marginRight: -20, color }} />
          ),
        }}>
        {props => (
          <DrawerScreenContainer>
            <Favourites {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="PROFILE"
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="account" size={25} style={{ marginRight: -20, color }} />
          ),
        }}>
        {props => (
          <DrawerScreenContainer>
            <Profile {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
