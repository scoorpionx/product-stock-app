import React from 'react';
import ActionButton from 'react-native-action-button';
import withGlobalStateHookWrapper from '../../context/withGlobalStateHookWrapper';
import { Container, View } from './style';
import Product from '../../components/Product/index.js';

class List extends React.Component {
  products;

  constructor(props) {
    super(props);
  }

  onPlusPress() {
    this.props.navigation.navigate('NewProduct');
  }

  render() {
    return (
      <View>
        <Container>
          {this.props.globalState.products.map((product, index) => (
            <Product data={product} index={index} />
          ))}
        </Container>
        <ActionButton
          buttonColor="#0a81ff"
          verticalOrientation="up"
          position="right"
          onPress={() => this.onPlusPress()}
        />
      </View>
    );
  }
}

export default withGlobalStateHookWrapper(List);
