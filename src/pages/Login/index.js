import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import UserService from '../../services/user';
import withGlobalStateHookWrapper from '../../context/withGlobalStateHookWrapper';
import { Container, Form, FormInput, FormButton, Text } from './style';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onLoginPress = async () => {
    const userService = new UserService();
    const getDataByQuery = await userService.login(
      this.state.email,
      this.state.password
    );
    const { token, error } = getDataByQuery?.data;
    console.log(error);
    if (error) {
      if (error.message === 'Network Error') {
        Alert.alert('Erro', 'Erro com a comunicação com o servidor');
      }
      if (error.response.status === 401) {
        Alert.alert('Erro', 'Usuário ou senha incorretos');
      }
      if (error.response.status === 400) {
        Alert.alert('Erro', 'Preencha todos os campos');
      }
      return [];
    }
    await AsyncStorage.setItem('user_token', token);
    this.props.globalState.setApiToken(token);
    return this.props.navigation.navigate('Loading');
  };

  render() {
    return (
      <Container>
        <Text>Controle de Produtos</Text>
        <Form>
          <FormInput
            keyboardType="email-address"
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            placeholderColor="#c4c3cb"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
          <FormInput
            placeholder="Password"
            placeholderColor="#c4c3cb"
            secureTextEntry
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <FormButton onPress={this.onLoginPress} title="Login" />
        </Form>
      </Container>
    );
  }
}

export default withGlobalStateHookWrapper(Login);
