import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [], // {id, name, price, quantity}
    },
    reducers: {
        addToCart: (state, action) => {
            const existing = state.items.find((i) => i.id === action.payload.id);
            if (existing) {
                existing.quantity = action.payload.quantity; // Replace, don’t add
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((i) => i.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
