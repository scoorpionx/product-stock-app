import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import withGlobalStateHookWrapper from '../../context/withGlobalStateHookWrapper';
import { Container, Info, Icons, Text, DescriptionText, Image } from './style';

class Product extends React.Component {
  id;

  name;

  price;

  images;

  description;

  index;

  constructor(props) {
    super(props);
    this.state = {
      descriptionVisible: null,
    };
    this.index = props.index;
    this.id = props.data.id;
    this.name = props.data.name;
    this.price = props.data.price;
    this.images = props.data.images;
    this.description = props.data.description;
  }

  onDeletePress = async () => {
    const USER_TOKEN = await AsyncStorage.getItem('user_token');
    Alert.alert(
      'Confirmação',
      `Tem certeza que deseja excluir o produto ${this.name}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            await api
              .delete(`admin/products/${this.id}`, {
                headers: {
                  Authorization: `Bearer ${USER_TOKEN}`,
                },
              })
              .then(async () => {
                const newProducts = [...this.props.globalState.products];
                if (this.index !== -1) {
                  newProducts.splice(this.index, 1);
                  await this.props.globalState.setProducts([]);
                  await this.props.globalState.setProducts([...newProducts]);
                  console.log(this.props.globalState.products);
                }
                return Alert.alert('Aviso', 'Produto excluído com sucesso!', [
                  {
                    text: 'Ok',
                    style: 'ok',
                  },
                ]);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <Container
        onPress={() =>
          this.setState({
            descriptionVisible: !this.state.descriptionVisible,
          })
        }
      >
        <Info>
          <Text>{this.name}</Text>
          <Text>R$ {this.price}</Text>
        </Info>
        <DescriptionText visible={this.state.descriptionVisible}>
          {this.description}
        </DescriptionText>
        {this.images ? (
          this.images.map((image) => (
            <>
              <Image
                source={{ uri: image.path }}
                visible={!this.state.descriptionVisible}
              />
            </>
          ))
        ) : (
          <></>
        )}
        <Icons>
          <Feather name="edit" size={40} color="#000" />
          <Feather
            name="trash"
            size={40}
            color="#000"
            onPress={() => this.onDeletePress()}
          />
        </Icons>
      </Container>
    );
  }
}

export default withGlobalStateHookWrapper(Product);
