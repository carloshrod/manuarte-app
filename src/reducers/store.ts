import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui/uiSlice';
import productsReducer from './products/productSlice';
import productCategoriesReducer from './productCategories/productCategorySlice';
import usersReducer from './users/userSlice';
import quotesReducer from './quotes/quoteSlice';
import billingsReducer from './billings/billingSlice';
import stocksReducer from './stockItems/stockItemSlice';

const store = configureStore({
	reducer: {
		ui: uiReducer,
		product: productsReducer,
		productCategory: productCategoriesReducer,
		user: usersReducer,
		quote: quotesReducer,
		billing: billingsReducer,
		stock: stocksReducer
	}
});

export default store;
