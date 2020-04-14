import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { CartProvider } from './cartContext';
import { PurchaseProvider } from './purchaseContext';
import App from './components/App';


const store = configureStore();

ReactDOM.render(
  // <React.StrictMode>
  <Provider store = {store}>
    <CartProvider>
      <PurchaseProvider>
        <App />
      </PurchaseProvider>
    </CartProvider>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);