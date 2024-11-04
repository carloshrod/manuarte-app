import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui/uiSlice';
import productsReducer from './products/productSlice';

const store = configureStore({
	reducer: {
		ui: uiReducer,
		product: productsReducer
	}
});

export default store;
