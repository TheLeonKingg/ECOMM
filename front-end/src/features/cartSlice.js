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
                (item) => item._id === action.payload.id);
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
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer; 