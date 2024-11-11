import { createSlice } from '@reduxjs/toolkit';
import { formatProductVariantState } from '../utils';

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
			const newProduct = action.payload;
			const newProductVariants = formatProductVariantState(newProduct);

			state.products = [newProduct, ...state.products];
			state.productVariants = [...newProductVariants, ...state.productVariants];
		},

		addProductVariant: (state, action) => {
			state.productVariants = [action.payload, ...state.productVariants];
		}
	}
});

export const {
	getProducts,
	getProductVariants,
	getProductCategories,
	addProduct,
	addProductVariant
} = productSlice.actions;
export default productSlice.reducer;
