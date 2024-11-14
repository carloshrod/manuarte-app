import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	productCategories: [] as ProductCategory[]
};

export const productCategorySlice = createSlice({
	name: 'productCategories',
	initialState,
	reducers: {
		getProductCategories: (state, action) => {
			state.productCategories = action.payload;
		},

		addProductCategory: (state, action) => {
			state.productCategories = [action.payload, ...state.productCategories];
		},

		updateProductCategory: (state, action) => {
			const updatedProductCategory = action.payload;
			state.productCategories = state.productCategories.map(productCat =>
				productCat.id === updatedProductCategory.id
					? updatedProductCategory
					: productCat
			);
		},

		removeProductCategory: (state, action) => {
			state.productCategories = state.productCategories.filter(
				productCat => productCat.id !== action.payload
			);
		}
	}
});

export const {
	getProductCategories,
	addProductCategory,
	updateProductCategory,
	removeProductCategory
} = productCategorySlice.actions;
export default productCategorySlice.reducer;
