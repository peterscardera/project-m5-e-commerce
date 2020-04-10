// START OF USER ACTIONS
// logging in:
export const requestUserInfo = () => ({
  type: 'REQUEST_USER_INFO',
});

export const receiveUserInfo = (user) => ({
  type: 'RECEIVE_USER_INFO',
  user,
});

export const receiveUserInfoError = () => ({
  type: 'RECEIVE_USER_INFO_ERROR',
});

// logging out:
// export const requestLogUserOut = () => ({
//   type: 'REQUEST_LOG_USER_OUT',
// });

export const logUserOutSuccess = () => ({
  type: 'LOG_USER_OUT_SUCCESS',
});

// export const logUserOutError = () => ({
//   type: 'LOG_USER_OUT_ERROR',
// });
// END OF USER ACTIONS

// START OF GALLERY ACTIONS
export const requestGalleryItems = () => ({
  type: 'REQUEST_GALLERY_ITEMS',
});

export const receiveGalleryItems = (items) => ({
  type: 'RECEIVE_GALLERY_ITEMS',
  items,
});

export const receiveGalleryItemsError = () => ({
  type: 'RECEIVE_GALLERY_ITEMS_ERROR',
});
// END OF GALLERY ACTIONS

// START OF VENDORS ACTIONS
export const requestVendors = () => ({
  type: 'REQUEST_VENDORS',
});

export const receiveVendors = (vendors) => ({
  type: 'RECEIVE_VENDORS',
  vendors,
});

export const receiveVendorsError = () => ({
  type: 'RECEIVE_VENDORS_ERROR',
});
// END OF VENDORS ACTIONS

// START OF ORDERS ACTIONS
export const requestOrders = () => ({
  type: 'REQUEST_ORDERS',
});

export const receiveOrdersSuccess = (orderHistory,currentCart) => ({
  type: 'RECEIVE_ORDERS_SUCCESS',
  orderHistory,
  currentCart,
});

export const receiveOrdersError = () => ({
  type: 'RECEIVE_ORDERS_ERROR',
});

export const requestAddItemToCart = () => ({
  type: 'REQUEST_ADD_ITEM_TO_CART',
});

export const addItemToCartSuccess = (item, quantity) => ({
  type: 'ADD_ITEM_TO_CART_SUCCESS',
  item,
  quantity,
});

export const addItemToCartError = () => ({
  type: 'ADD_ITEM_TO_CART_ERROR',
});

export const requestDiscardItem = () => ({
  type: 'REQUEST_DISCARD_ITEM',
});

export const DiscardItemSuccess = (item) => ({
  type: 'DISCARD_ITEM_SUCCESS',
  item,
});

export const DiscardItemError = () => ({
  type: 'DISCARD_ITEM_ERROR',
});

export const requestRemoveItem = () => ({
  type: 'REQUEST_REMOVE_ITEM',
});

export const removeItemFromCartSuccess = (item, quantity) => ({
  type: 'REMOVE_ITEM_FROM_CART_SUCCESS',
  item,
  quantity,
});

export const removeItemFromCartError = () => ({
  type: 'REMOVE_ITEM_FROM_CART_ERROR',
});

export const requestEmptyCart = () => ({
  type: 'REQUEST_EMPTY_CART',
});

export const emptyCartSuccess = () => ({
  type: 'EMPTY_CART_SUCCESS',
});

export const emptyCartError = () => ({
  type: 'EMPTY_CART_ERROR',
});

export const requestPurchase = () => ({
  type: 'REQUEST_PURCHASE',
});

export const purchaseSuccess = (orderId) => ({
  type: 'PURCHASE_SUCCESS',
  orderId,
});

export const purchaseError = () => ({
  type: 'PURCHASE_ERROR',
});