import Image from './Image';

export default class Product {
  id;

  name;

  price;

  description;

  images;

  constructor(product) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.images = product.images.map((data) => new Image(data));
  }
}
