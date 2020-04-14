// Sample of object layout
// currentCart: {
//   "itemId#" : {
//     itemInfo: action.item,
//     quantity: "quantity",
//   }
//   "itemId#" : {
//     itemInfo: action.item,
//     quantity: "quantity",
//   }
// }


const initialState = {
  currentCart: {},
  orderHistory: [],
  status: 'idle',
};

export default function ordersReducer(state = initialState, action) {
  // console.log('action: ', action);
  switch (action.type) {
    // First three cases represent the obtaining of the carts.  This should be dispatched when a user logs in
    case 'REQUEST_ORDERS' : {
      return {
        ...state,
        status: 'loading',
      }
    }
    case 'RECEIVE_ORDERS_SUCCESS' : {
      return {
        orderHistory: action.orderHistory,
        currentCart: action.currentCart,
        // currentCart: action.carts[action.carts.length-1],
        status: 'idle',
      }
    }
    case 'RECEIVE_ORDERS_ERROR' : {
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
    case 'ADD_ITEM_TO_CART_SUCCESS' : {
      console.log('lololollololol', action.item);
      if (state.currentCart[action.item[0].id]) {
        console.log('AAACCTTIIONN.IIITTTEEEMMM', action.item);
      console.log(state.currentCart);
      console.log('FIRST QUANT TEST',state.currentCart[action.item[0].id].quantity);
      console.log('SECOND QUANT TEST', action.quantity);
        return {
          ...state,
          currentCart: {
            ...state.currentCart,
            [action.item[0].id] : {
              itemInfo: action.item[0],
              quantity: state.currentCart[action.item[0].id].quantity + action.quantity,
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
            [action.item[0].id] : {
              itemInfo: action.item[0],
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
      console.log('action.item:',action.item);
      console.log('state:', state);
      console.log("state's currentCart", state.currentCart);
      console.log("id from action:", action.item[0].id )
      console.log('item in cart using id from action:', state.currentCart[action.item[0].id]);
      // console.log('fishing for numInStock',state.currentCart[action.item[0].id].itemInfo[0].numInStock );
      console.log('qant in state:', state.currentCart[action.item[0].id].quantity );
      console.log('action.quantity', parseInt(action.quantity));
      console.log('')
      if (parseInt(state.currentCart[action.item[0].id].quantity) === parseInt(action.quantity)) {
        const newState = { ...state};
        delete newState.currentCart[action.item[0].id];
        return {...newState};
      }
      else { // case: removing some, but not all, of a given item from the cart
        return {
          ...state,
          currentCart: {
            ...state.currentCart,
            [action.item[0].id] : {
              ...state.currentCart[action.item[0].id],
              quantity: state.currentCart[action.item[0].id].quantity - action.quantity,
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
        ...initialState,
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
      let newHistory = state.orderHistory;
      let completedOrder = {[action.orderId]: [state.currentCart]};
      newHistory.push(completedOrder);
      return {
        ...state,
        orderHistory: newHistory,
        currentCart: {},
      }
    }
    case 'PURCHASE_ERROR': {
      return {
        ...state,
        status: 'error',
      }
    }
    // Final type is to reset the error status, should an error have occured
    case 'RESET_ERROR_STATUS' : {
      return {
        ...state,
        status: 'idle',
      }
    }

    default: {
      return state;
    }
  }
}

export const getCart = state => state.currentCart;
export const getOrderHistory = state => state.orderHistory;
export const getCartStatus = state => state.status;