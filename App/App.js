/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './src/components/Home';
import Video from './src/components/Video';

const Drawer = createDrawerNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name='Home' component={Home}/> 
        <Drawer.Screen name='Video' component={Video}/>
      </Drawer.Navigator>      
    </NavigationContainer>
  );
};

export default App;
