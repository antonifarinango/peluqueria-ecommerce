const initialState = {
    cart: [],
    totalPrice: 0,
    cartId: null,
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CART":
            const productToAdd = action.payload;
            const existingProduct = state.cart.find(
                (item) => item.productId === productToAdd.productId
            );

            let updatedCart;
            if(existingProduct) {
                updatedCart = state.cart.map((item) => {
                    if (item.productId === productToAdd.productId) {
                        return productToAdd;
                    } else {
                        return item;
                    }
                });
            } else {
                updatedCart = [...state.cart, productToAdd];
            }

            const newTotalPrice = updatedCart.reduce(
                (acc, cur) => acc + Number(cur.specialPrice) * Number(cur.quantity), 
                0
            );

            /* NECESARIO PARA IMPLEMENTAR STRIPE 
            if(existingProduct) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.productId === productToAdd.productId ? productToAdd : item
                    ),
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, productToAdd],
                };
            }
            */
            return {
                ...state,
                cart: updatedCart,
                totalPrice: newTotalPrice,
            };
        case "REMOVE_CART":
            const filteredCart = state.cart.filter(
                (item) => item.productId !== action.payload.productId
            );
            const totalAfterRemove = filteredCart.reduce(
                (acc, cur) => acc + Number(cur.specialPrice) * Number(cur.quantity), 
                0
            );

            /* NECESARIO PARA IMPLEMENTAR STRIPE
            return {
                ...state,
                cart: state.cart.filter((item) => item.productId !== action.payload.productId),
            };
            */
            return {
                ...state,
                cart: filteredCart,
                totalPrice: totalAfterRemove,
            };
        case "GET_USER_CART_PRODUCTS":
            const cartItemsFromApi = action.payload || [];
            const totalPriceFromApi = action.totalPrice !== undefined && action.totalPrice !== null
                ? action.totalPrice
                : cartItemsFromApi.reduce(
                    (acc, cur) => acc + Number(cur.specialPrice) * Number(cur.quantity), 
                    0
                );

            return {
                ...state,
                cart: cartItemsFromApi,
                totalPrice: totalPriceFromApi,
                cartId: action.cartId,
            };
        case "CLEAR_CART":
            return { cart:[], totalPrice: 0, cartId: null};
        default:
            return state;
    }
    return state;
}