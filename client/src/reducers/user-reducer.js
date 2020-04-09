const initialState = {
    user: null,
    status: 'idle',
};

export default function userReducer(state = initialState, action) {
  // console.log('action: ', action);
  switch (action.type) {
    case 'REQUEST_USER_INFO' : {
      return {
        ...state,
        status: 'loading',
      }
    }
    case 'RECEIVE_USER_INFO' : {
      return {
        user: action.user,
        status: 'idle',
      }
    }
    case 'RECEIVE_USER_INFO_ERROR' : {
      return {
        ...state,
        status: 'error',
      }
    }
    case 'REQUEST_LOG_USER_OUT' : {
      return {
        ...state,
        status: 'loading',
      }
    }
    case 'LOG_USER_OUT' : {
      return {...initialState}
    }
    case 'LOG_USER_OUT_ERROR' : {
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

export const getGallery = state => state.items;
export const getGalleryStatus = state => state.status;