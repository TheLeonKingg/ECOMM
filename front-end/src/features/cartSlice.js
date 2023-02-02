import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    cartTotalQuantitiy: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantitiy += 1
                toast.info
                    (`increased ${state.cartItems[itemIndex].name} cart quantity`, {
                        position: "bottom-center",
                    });
            } else {
                const tempProduct = { ...action.payload, cartQuantitiy: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} Added To Cart`, {
                    position: "top-center",
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                (cartItem) => cartItem._id !== action.payload._id
            );
            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            toast.error(`${action.payload.name} Removed From Cart`, {
                position: "bottom-center",
            });
        },
        decreaseCartQuantity(state, action) {

            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem._id === action.payload._id)

            if (state.cartItems[itemIndex].cartQuantitiy > 1) {
                state.cartItems[itemIndex].cartQuantitiy -= 1
                toast.info(`Decrease${action.payload.name}  From Cart`, {
                    position: "bottom-center",
                });

            } else if (state.cartItems[itemIndex].cartQuantitiy === 1) {
                const nextCartItems = state.cartItems.filter(
                    (cartItem) => cartItem._id !== action.payload._id
                );
                state.cartItems = nextCartItems;
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
                toast.error(`${action.payload.name} Removed From Cart`, {
                    position: "bottom-center",
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        clearCart(state, action) {
            state.cartItems = []
            toast.error(`Cart Cleared`, {
                position: "bottom-center",
            });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        getTotal(state, action) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;
                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                }, {
                total: 0,
                quantity: 0
            }
            );
            state.cartTotalQuantitiy = quantity;
            state.cartTotalAmount = total;
        },



    },
});

export const { addToCart, removeFromCart, decreaseCartQuantity, clearCart, getTotal } = cartSlice.actions;

export default cartSlice.reducer; 