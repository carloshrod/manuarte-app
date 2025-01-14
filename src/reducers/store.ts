import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui/uiSlice';
import productsReducer from './products/productSlice';
import productCategoriesReducer from './productCategories/productCategorySlice';
import usersReducer from './users/userSlice';
import quotesReducer from './quotes/quoteSlice';

const store = configureStore({
	reducer: {
		ui: uiReducer,
		product: productsReducer,
		productCategory: productCategoriesReducer,
		user: usersReducer,
		quote: quotesReducer
	}
});

export default store;
