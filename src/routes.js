import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './pages/Login/index';
import ListScreen from './pages/List/index';
import NewScreen from './pages/New/index';
import LoadingScreen from './pages/Loading/index';

const Stack = createStackNavigator();

class Routes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
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
      </>
    );
  }
}

export default withGlobalStateHookWrapper(Routes);
