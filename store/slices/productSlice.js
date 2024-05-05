import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSingleProductState: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setSingleProductState } = productSlice.actions;
export const productReducer = productSlice.reducer;
