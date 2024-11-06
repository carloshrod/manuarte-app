import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	products: [] as Product[],
	productVariants: [] as ProductVariant[],
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
		},
		addProduct: (state, action) => {
			const { newProduct, newProductVariants } = action.payload;

			state.products = [newProduct, ...state.products];
			state.productVariants = [...newProductVariants, ...state.productVariants];
		}
	}
});

export const {
	getProducts,
	getProductVariants,
	getProductCategories,
	addProduct
} = productSlice.actions;
export default productSlice.reducer;
