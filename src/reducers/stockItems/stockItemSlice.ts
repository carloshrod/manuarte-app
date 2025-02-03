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
		},

		addStockItem: (state, action) => {
			state.stockItems = [action.payload, ...state.stockItems];
		},

		updateStockItem: (state, action) => {
			const updatedStockItem = action.payload;

			state.stockItems = state.stockItems.map(stockItem =>
				stockItem.id === updatedStockItem.id ? updatedStockItem : stockItem
			);
		},

		removeStockItem: (state, action) => {
			state.stockItems = state.stockItems.filter(
				stockItem => stockItem.id !== action.payload
			);
		}
	}
});

export const { setStockItems, addStockItem, updateStockItem, removeStockItem } =
	stockSlice.actions;
export default stockSlice.reducer;
