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

			state.products =
				state.products.length > 0 ? [newProduct, ...state.products] : [];
			state.productVariants = [
				...newProductVariants,
				...state.productVariants
			].slice(0, state.productVariantsPagination.pageSize);
			state.productVariantsPagination.total += newProductVariants.length;
		},

		updateProduct: (state, action) => {
			const { productVariant, ...product } = action.payload;

			const newProductData =
				state.products.length > 0
					? state.products.map(p =>
							p.id === product.id ? { ...p, name: product.name } : p
						)
					: [];

			const newProductVariantData = state.productVariants.map(pv =>
				pv.productId === product.id
					? {
							...pv,
							name: pv.id === productVariant.id ? productVariant.name : pv.name,
							productName: product.name,
							productDescription: product.description
						}
					: pv
			);

			state.products = newProductData;
			state.productVariants = newProductVariantData;
		},

		addProductVariant: (state, action) => {
			state.productVariants = [action.payload, ...state.productVariants].slice(
				0,
				state.productVariantsPagination.pageSize
			);
			state.productVariantsPagination.total += 1;
		},

		updateProductVariant: (state, action) => {
			const productVariant = action.payload;

			const newData = state.productVariants.map(pv =>
				pv.id === productVariant.id ? { ...pv, name: productVariant.name } : pv
			);

			state.productVariants = newData;
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
	updateProduct,
	addProductVariant,
	updateProductVariant,
	removeProduct
} = productSlice.actions;
export default productSlice.reducer;
