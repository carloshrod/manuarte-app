import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	stockItems: [] as StockItem[]
};

const stockSlice = createSlice({
	name: 'stockItem',
	initialState,
	reducers: {
		setStockItems: (state, action) => {
			state.stockItems = action.payload;
		}
	}
});

export const { setStockItems } = stockSlice.actions;
export default stockSlice.reducer;
