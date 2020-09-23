import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { AsyncStorage } from 'react-native';
import ProductService from '../services/products';

const SET_API_TOKEN = 'SET_API_TOKEN';
const SET_PRODUCTS = 'SET_PRODUCTS';

const GlobalStateContext = createContext();

const initialState = {
  apiToken: '',
  products: [],
};

const globalStateReducer = (state, action) => {
  switch (action.type) {
    case SET_API_TOKEN:
      return {
        ...state,
        apiToken: action.payload,
      };

    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalStateContext);

  const setApiToken = (apiToken) => {
    dispatch({
      type: SET_API_TOKEN,
      payload: apiToken,
    });
  };

  const setProducts = (products) => {
    dispatch({
      type: SET_PRODUCTS,
      payload: products,
    });
  };

  const getProducts = useCallback(async () => {
    const token = await AsyncStorage.getItem('user_token');
    const productService = new ProductService();
    const getDataByQuery = await productService.getProducts(token);
    const { data: products, error } = getDataByQuery?.data;
    setProducts(products);
  }, [state.products]);

  useEffect(() => {
    getProducts();
  }, [state.apiToken]);

  return {
    setApiToken,
    getProducts,
    setProducts,
    products: state.products,
  };
};

export default useGlobalState;
