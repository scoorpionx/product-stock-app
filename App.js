import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/pages/Login/index';
import ListScreen from './src/pages/List/index';
import NewScreen from './src/pages/New/index';
import LoadingScreen from './src/pages/Loading/index';

import { GlobalStateProvider } from './src/context/useGlobalState';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <GlobalStateProvider>
        <NavigationContainer
          ref={(nav) => {
            this.navigator = nav;
          }}
        >
          <Stack.Navigator
            initialRouteName="Loading"
            screenOptions={{ gestureEnabled: false }}
            headerMode="none"
          >
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={ListScreen} />
            <Stack.Screen name="NewProduct" component={NewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GlobalStateProvider>
    );
  }
}
