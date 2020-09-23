import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;

export const Text = styled.Text`
  font-size: 40px;
  text-align: center;
`;

export const Form = styled.View`
  align-self: stretch;
  padding: 10px 15px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const FormInput = styled.TextInput`
  background-color: #fff;
  padding: 9px;
  margin-bottom: 10px;
  border: 0.1px solid #000000;
  border-radius: 4px;
  font-size: 20px;
`;

export const FormButton = styled(Button)``;
