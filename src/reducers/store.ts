import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui/uiSlice';
import productsReducer from './products/productSlice';
import productCategoriesReducer from './productCategories/productCategorySlice';
import usersReducer from './users/userSlice';

const store = configureStore({
	reducer: {
		ui: uiReducer,
		product: productsReducer,
		productCategory: productCategoriesReducer,
		users: usersReducer
	}
});

export default store;
