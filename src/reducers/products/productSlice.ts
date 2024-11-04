import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: [],
	productVariants: [],
	productCategories: []
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		getProducts: (state, action) => {
			state.products = action.payload;
		},
		getProductVariants: (state, action) => {
			state.productVariants = action.payload;
		},
		getProductCategories: (state, action) => {
			state.productCategories = action.payload;
		}
	}
});

export const { getProducts, getProductVariants, getProductCategories } =
	productSlice.actions;
export default productSlice.reducer;
