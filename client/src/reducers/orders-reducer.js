const initialState = {
  orders: {},
  currentCart: {},
  status: 'idle',
};

export default function ordersReducer(state = initialState, action) {
  // console.log('action: ', action);
  switch (action.type) {

    // First three cases represent the obtaining of the carts.  This should be dispatched when a user logs in
    case 'REQUEST_CARTS' : {
      return {
        ...state,
        status: 'loading',
      }
    }
    case 'RECEIVE_CARTS' : {
      return {
        orders: action.carts,
        currentCart: action.carts[action.carts.length-1],
        status: 'idle',
      }
    }
    case 'RECEIVE_CARTS_ERROR' : {
      return {
        ...state,
        status: 'error',
      }
    }

    // Next three cases are to add an item to the cart
    case 'REQUEST_ADD_ITEM_TO_CART' : {
      return {
        ...state,
        status: 'sending',
      }
    }
    case 'ADD_ITEM_TO_CART_SUCCESS' : { // is this supposed to be currentCart?  last order in orders also needs to change
      if (state.currentCart[action.item.id]) {
        return {
          ...state,
          currentCart: {
            ...state.currentCart,
            [action.item.id] : {
              itemInfo: action.item,
              quantity: state.currentCart[action.item.id].quantity + action.quantity,
            }
          },
          status: 'idle',
        }
      }
      else {
        return {
          ...state,
          currentCart: {
            ...state.currentCart,
            [action.item.id] : {
              itemInfo: action.item,
              quantity: action.quantity,
            }
          },
          status: 'idle',
        }
      }
    }
    case 'ADD_ITEM_TO_CART_ERROR' : {
      return {
        ...state,
        status: 'error',
      }
    }

    // Next three cases are to remove the full quantity of an items from a cart
    case 'REQUEST_DISCARD_ITEM': {
      return {
        ...state,
        status: 'sending',
      }
    }
    case 'DISCARD_ITEM_SUCCESS': {
      const newState = { ...state};
      delete newState.currentCart[action.item.id];
      return {...newState};
    }
    case 'DISCARD_ITEM_ERROR': {
      return {
        ...state,
        status: 'error',
      }
    }

    // Next three cases are to remove a variable quantity of an item from the cart
    case 'REQUEST_REMOVE_ITEM': {
      return {
        ...state,
        status: 'sending',
      }
    }
    case 'REMOVE_ITEM_FROM_CART_SUCCESS' : {
      // case: eliminating all of a given item from the cart
      if (state.currentCart[action.item.id].quantity === action.quantity) {
        const newState = { ...state};
        delete newState.currentCart[action.item.id];
        return {...newState};
      }
      else { // case: removing some, but not all, of a given item from the cart
        return {
          ...state,
          cart: {
            ...state.cart,
            [action.item.id] : {
              ...state.cart[action.item.id],
              quantity: state.cart[action.item.id].quantity - action.item.quantity,
            }
          },
          status: 'idle',
        }
      }
    }
    case 'REMOVE_ITEM_FROM_CART_ERROR' : {
      return {
        ...state,
        status: 'error',
      }
    }

    // Next three cases are clicking a clear button.  
    // Note: This is NOT intended to be used during a PURCHASE event
    case 'REQUEST_EMPTY_CART': {
      return {
        ...state,
        status: 'sending',
      }
    }
    case 'EMPTY_CART_SUCCESS': {
      return {
        ...state,
        currentCart: {},
        status: 'idle',
      };
    }
    case 'EMPTY_CART_ERROR': {
      return {
        ...state,
        status: 'error',
      }
    }

    // The next three are for a purchase event
    case 'REQUEST_PURCHASE': {
      return {
        ...state,
        status: 'purchasing',
      }
    }
    // when the below state occurs, the 
    case 'PURCHASE_SUCCESS': {
      return {
        ...state,
        orders: {
          ...state.orders,
          [state.currentCart.id]: state.currentCart,
        },
        currentCart: {},
      }
    }
    case 'EMPTY_CART_ERROR': {
      return {
        ...state,
        status: 'error',
      }
    }


    default: {
      return state;
    }
  }
}

export const getCart = state => state.currentCart;
export const getOrders = state => state.orders;
export const getCartStatus = state => state.status;