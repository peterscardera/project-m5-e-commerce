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
export const logUserOut = () => ({
  type: 'LOG_USER_OUT',
});

// creating new user:
export const requestCreateNewUser = () => ({
  type: 'REQUEST_CREATE_NEW_USER',
});

export const createNewUserSuccess = () => ({
  type: 'CREATE_NEW_USER_SUCCESS',
});

export const createNewUserError = () => ({
  type: 'CREATE_NEW_USER_ERROR',
});

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
export const resetErrorStatus = () => ({
  type: 'RESET_ERROR_STATUS',
});

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

export const discardItemSuccess = (item) => ({
  type: 'DISCARD_ITEM_SUCCESS',
  item,
});

export const discardItemError = () => ({
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