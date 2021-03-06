import user from './user-reducer';
import orders from './orders-reducer';
import gallery from './gallery-reducer';
import vendors from './vendors-reducer';

import { combineReducers } from 'redux';

export default combineReducers({ 
  user,
  orders,
  gallery,
  vendors,
});