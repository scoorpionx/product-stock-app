import React from 'react';
import { AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { StackActions } from '@react-navigation/native';
import withGlobalStateHookWrapper from '../../context/withGlobalStateHookWrapper';
import { View } from './style';
import ProductService from '../../services/products';

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
    };
  }

  async componentDidMount() {
    this.prepareResources();
  }

  prepareResources = async () => {
    try {
      await this.checkToken();
      await this.performAPICalls();
      this.setState({ isLoading: false });
      return this.props.navigation.dispatch({
        ...StackActions.replace('Home'),
        source: 'Loading',
      });
    } catch (error) {
      console.log(error);
    }
  };

  sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  checkToken = async () => {
    const token = await AsyncStorage.getItem('user_token');
    if (!token) {
      await this.sleep(10000);
      return this.props.navigation.navigate('Login');
    }
    this.setState({ token });
  };

  performAPICalls = async () => {
    const productService = new ProductService();
    const { data: products, error } = await productService.getProducts(
      this.state.token
    );
    if (error) {
      return Alert.alert(
        'Erro',
        'Erro ao carregar o produto, entre em contato com o suporte'
      );
    }
    return this.props.globalState.setProducts(products.data);
  };

  render() {
    return (
      <View>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }
}

export default withGlobalStateHookWrapper(LoadingScreen);
