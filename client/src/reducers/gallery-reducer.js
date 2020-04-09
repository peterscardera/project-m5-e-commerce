const initialState = {
    items: null,
    status: 'idle',
};

export default function galleryReducer(state = initialState, action) {
  // console.log('action: ', action);
  switch (action.type) {
    case 'REQUEST_GALLERY_ITEMS' : {
      return {
        ...state,
        status: 'loading',
      }
    }
    case 'RECEIVE_GALLERY_ITEMS' : {
      return {
        items: action.items,
        status: 'idle',
      }
    }
    case 'RECEIVE_GALLERY_ITEMS_ERROR' : {
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