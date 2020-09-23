import api from './api';
import Product from '../domain/models/Product';

class ProductService {
  async getProducts(USER_TOKEN) {
    try {
      return await api.get('admin/products', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${USER_TOKEN}`,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async newProductWithImage(name, price, description, image, USER_TOKEN) {
    try {
      return await api
        .post(
          'admin/products',
          {
            name,
            price,
            description,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${USER_TOKEN}`,
            },
          }
        )
        .then(async (response) => {
          const { id } = response.data;
          const uriParts = image.uri.split('.');
          const fileType = uriParts[uriParts.length - 1];
          const nameParts = uriParts[uriParts.length - 2].split('/');
          const fileName = nameParts[nameParts.length - 1];

          const data = new FormData();

          await data.append('image', {
            uri:
              Platform.OS === 'android'
                ? image.uri
                : image.uri.replace('file://', ''),
            type: `image/${fileType}`,
            name: `${fileName}.${fileType}`,
          });

          await data.append('product_id', id);

          return await api
            .post('admin/images', data, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${USER_TOKEN}`,
              },
            })
            .then((imageRes) => {
              return new Product({
                id: response.data.id,
                name: response.data.name,
                price: response.data.price,
                description: response.data.description,
                images: [
                  {
                    id: imageRes.data.id,
                    path: imageRes.data.url,
                  },
                ],
              });
            });
        });
    } catch (error) {
      return error;
    }
  }

  async newProduct(name, price, description, USER_TOKEN) {
    try {
      return await api
        .post(
          'admin/products',
          {
            name,
            price,
            description,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${USER_TOKEN}`,
            },
          }
        )
        .then((response) => {
          return new Product({
            id: response.data.data.id,
            name: response.data.data.name,
            price: response.data.data.price,
            description: response.data.data.description,
            images: [],
          });
        });
    } catch (error) {
      return error;
    }
  }
}
export default ProductService;
