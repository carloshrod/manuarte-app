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
		},

		removeProduct: (state, action) => {
			const { productId, productVariantId } = action.payload ?? {};

			state.productVariants = state.productVariants.filter(
				productV => productV.id !== productVariantId
			);

			if (productId) {
				state.products = state.products.filter(
					product => product.id !== productId
				);
			}
		}
	}
});

export const {
	getProducts,
	getProductVariants,
	getProductCategories,
	addProduct,
	addProductVariant,
	removeProduct
} = productSlice.actions;
export default productSlice.reducer;
