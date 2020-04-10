const initialState = {
  vendors: null,
  status: 'idle',
};

export default function vendorsReducer(state = initialState, action) {
// console.log('action: ', action);
switch (action.type) {
  case 'REQUEST_VENDORS' : {
    return {
      ...state,
      status: 'loading',
    }
  }
  case 'RECEIVE_VENDORS' : {
    return {
      items: action.vendors,
      status: 'idle',
    }
  }
  case 'RECEIVE_VENDORS_ERROR' : {
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

export const getVendors = state => state.vendors;
export const getVendorsStatus = state => state.status;