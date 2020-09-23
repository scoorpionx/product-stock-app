import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const View = styled.SafeAreaView.attrs({
  marginTop: Platform.OS === 'android' ? 40 : 0,
})`
  flex: 1;
`;

export const Container = styled.ScrollView``;
