import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';

export const View = styled.SafeAreaView.attrs({
    marginTop: Platform.OS === 'android' ? 30 : 0,
})`
    flex: 1;
`;

export const ScrollView = styled.ScrollView``;

export const Header = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px;
    padding-bottom: 10px;
`;

export const TextContainer = styled.View`
`;

export const Text = styled.Text`
    padding: 10px;
    margin-left: 15px;
    font-size: 20px;
`;


export const Container = styled.View`
    padding: 10px;
`;

export const Input = styled.TextInput`
    background-color: #fff;
    padding: 9px;
    margin-bottom: 12px;
    border: 0.1px solid #000000;
    border-radius: 4px;
    flex-grow: 1; 
    font-size: 20px;
`;  

export const Price = styled.View`
    display: flex;
    flex-direction: row;
`;

export const Thumbnail = styled.TouchableOpacity`
    border: 0.6px dashed #000;
    border-radius: 10px;
    display: flex;
    height: 260px;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
`;

export const ThumbnailRendered = styled.TouchableOpacity`
    display: flex;
    /* height: 260px; */
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
`;

export const ImageBackground = styled.ImageBackground`
    width: 100%;
    height: 500px;
    justify-content: center;
`;


export const FormButton = styled(Button)``;
