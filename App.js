import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignUp from './screens/SignUp';
import DetailsScreen from './screens/DetailsScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
// import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen  options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen  options={{ headerShown: false }} name="SignUp" component={SignUp} />
        <Stack.Screen  options={{ headerShown: false }} name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen  options={{ headerShown: false }} name="ProductDetailsScreen" component={ProductDetailsScreen} />
        {/* <Stack.Screen  options={{ headerShown: false }} name="ProfileScreen" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );


 };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#E6E6FA',
    padding: 16,
  },
  textStyle: {
    marginTop: 10,
    fontWeight:"bold",
    color: "black",
  },
  
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
    fontWeight: "bold",
    color: "black",
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});

