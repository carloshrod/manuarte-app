import { createSlice } from '@reduxjs/toolkit';
import { formatProductVariantState } from '../utils';

const initialState = {
	products: [] as Product[],
	productVariants: [] as ProductVariant[],
	productVariantsPagination: {
		total: 0,
		page: 1,
		pageSize: 10,
		totalPages: 1
	} as Pagination
};

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.products = action.payload;
		},

		setProductVariants: (state, action) => {
			state.productVariants = action.payload.productVariants;
			state.productVariantsPagination = {
				total: action.payload.total,
				page: action.payload.page,
				pageSize: action.payload.pageSize,
				totalPages: action.payload.totalPages
			};
		},

		addProduct: (state, action) => {
			const newProduct = action.payload;
			const newProductVariants = formatProductVariantState(newProduct);

			state.products = [newProduct, ...state.products];
			state.productVariants = [
				...newProductVariants,
				...state.productVariants
			].slice(0, state.productVariantsPagination.pageSize);
			state.productVariantsPagination.total += newProductVariants.length;
		},

		addProductVariant: (state, action) => {
			state.productVariants = [action.payload, ...state.productVariants].slice(
				0,
				state.productVariantsPagination.pageSize
			);
			state.productVariantsPagination.total += 1;
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
	setProducts,
	setProductVariants,
	addProduct,
	addProductVariant,
	removeProduct
} = productSlice.actions;
export default productSlice.reducer;
