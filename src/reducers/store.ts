import { combineReducers, configureStore } from '@reduxjs/toolkit';
import productsReducer from './products/productSlice';
import productCategoriesReducer from './productCategories/productCategorySlice';
import usersReducer from './users/userSlice';
import quotesReducer from './quotes/quoteSlice';
import billingsReducer from './billings/billingSlice';
import stocksReducer from './stockItems/stockItemSlice';
import transactionsReducer from './transactions/transactionSlice';
import shopsReducer from './shops/shopSlice';
import financialFlowReducer from './financialFlow/financialFlowSlice';

const appReducer = combineReducers({
	product: productsReducer,
	productCategory: productCategoriesReducer,
	user: usersReducer,
	quote: quotesReducer,
	billing: billingsReducer,
	stock: stocksReducer,
	transaction: transactionsReducer,
	shop: shopsReducer,
	financialFlow: financialFlowReducer
});

const rootReducer = (
	state: ReturnType<typeof appReducer> | undefined,
	action: any
) => {
	if (action.type === 'RESET_APP') {
		state = undefined;
	}

	return appReducer(state, action);
};

const store = configureStore({
	reducer: rootReducer
});

export default store;
