import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './products/productSlice';
import productCategoriesReducer from './productCategories/productCategorySlice';
import usersReducer from './users/userSlice';
import quotesReducer from './quotes/quoteSlice';
import billingsReducer from './billings/billingSlice';
import stocksReducer from './stockItems/stockItemSlice';
import transactionsReducer from './transactions/transactionSlice';
import shopsReducer from './shops/shopSlice';

const store = configureStore({
	reducer: {
		product: productsReducer,
		productCategory: productCategoriesReducer,
		user: usersReducer,
		quote: quotesReducer,
		billing: billingsReducer,
		stock: stocksReducer,
		transaction: transactionsReducer,
		shop: shopsReducer
	}
});

export default store;
