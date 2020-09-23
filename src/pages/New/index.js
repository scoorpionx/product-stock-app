import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Camera from './camera.svgx';
import withGlobalStateHookWrapper from '../../context/withGlobalStateHookWrapper';
import ProductService from '../../services/products';

import {
  View,
  ScrollView,
  Container,
  Input,
  Price,
  Thumbnail,
  ThumbnailRendered,
  FormButton,
  Header,
  Text,
  TextContainer,
  ImageBackground,
} from './style';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      description: '',
      image: null,
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert(
          'Erro',
          'Desculpe, mas precisamos de permissão da câmera para continuar!'
        );
      }
    }
  };

  onBackPress = () => {
    this.props.navigation.navigate('Home');
  };

  pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        noData: true,
        allowsEditing: true,
      });
      if (!result.cancelled) {
        this.setState({ image: result });
      }
    } catch (E) {
      Alert.alert('Erro', E);
    }
  };

  // newImageFormData = async () => {
  //   const uriParts = this.state.image.uri.split('.');
  //   const fileType = uriParts[uriParts.length - 1];
  //   const nameParts = uriParts[uriParts.length - 2].split('/');
  //   const fileName = nameParts[nameParts.length - 1];

  //   const data = new FormData();

  //   await data.append('image', {
  //     uri:
  //       Platform.OS === 'android'
  //         ? this.state.image.uri
  //         : this.state.image.uri.replace('file://', ''),
  //     type: `image/${fileType}`,
  //     name: `${fileName}.${fileType}`,
  //   });

  //   return data;
  // };

  onSubmitPress = async () => {
    const USER_TOKEN = await AsyncStorage.getItem('user_token');
    // const formData = this.newImageFormData();
    const productService = new ProductService();

    const product = this.state.image
      ? await productService.newProductWithImage(
          this.state.name,
          this.state.price,
          this.state.description,
          this.state.image,
          USER_TOKEN
        )
      : await productService.newProduct(
          this.state.name,
          this.state.price,
          this.state.description,
          USER_TOKEN
        );

    const newProducts = [...this.props.globalState.products];
    newProducts.push(product);
    console.log(product);
    this.props.globalState.setProducts(newProducts);
    // if (error) {
    //   if (error.message === 'Network Error') {
    //     Alert.alert('Erro', 'Erro com a comunicação com o servidor');
    //   }
    //   if (error.response.status === 401) {
    //     Alert.alert('Erro', 'Usuário ou senha incorretos');
    //   }
    //   if (error.response.status === 400) {
    //     Alert.alert('Erro', 'Preencha todos os campos');
    //   }
    //   return [];
    // }
    // this.props.globalState.getProducts();
    return this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <View>
        <ScrollView>
          <Header>
            <Feather
              name="arrow-left"
              size={25}
              color="#000"
              onPress={this.onBackPress}
            />
            <TextContainer>
              <Text>Cadastro de Produtos</Text>
            </TextContainer>
          </Header>
          <Container>
            <Input
              placeholder="Nome do produto"
              value={this.state.name}
              onChangeText={(e) => this.setState({ name: e })}
            />
            <Price>
              <Input
                placeholder="Preço do produto"
                keyboardType="number-pad"
                value={this.state.price}
                onChangeText={(e) => this.setState({ price: e })}
              />
            </Price>
            <Input
              placeholder="Descrição"
              multiline
              numberOfLines={4}
              value={this.state.description}
              onChangeText={(e) => this.setState({ description: e })}
            />

            {this.state.image ? (
              <ThumbnailRendered onPress={this.pickImage}>
                <ImageBackground source={{ uri: this.state.image.uri }} />
              </ThumbnailRendered>
            ) : (
              <Thumbnail onPress={this.pickImage}>
                <Camera width={120} height={120} />
              </Thumbnail>
            )}

            <FormButton onPress={this.onSubmitPress} title="Cadastrar" />
          </Container>
        </ScrollView>
      </View>
    );
  }
}

export default withGlobalStateHookWrapper(Product);
