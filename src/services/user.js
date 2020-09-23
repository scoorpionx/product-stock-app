import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import api from './api';

class UserService {
  login(email, password) {
    try {
      return api.post('auth/login', {
        email,
        password,
      });
    } catch (err) {
      return err;
    }
  }
}
export default UserService;
