import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui/uiSlice';

const store = configureStore({
	reducer: {
		ui: uiReducer
	}
});

export default store;
