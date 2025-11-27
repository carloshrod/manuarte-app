import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	stockItems: [] as StockItem[],
	stockItemsPagination: {
		total: 0,
		page: 1,
		pageSize: 10,
		totalPages: 1
	} as Pagination,
	stockItem: {} as StockItem,
	stockItemHistory: [] as StockItemHistory[],
	stockItemHistoryPagination: {
		total: 0,
		page: 1,
		pageSize: 10,
		totalPages: 1
	} as Pagination
};

const stockSlice = createSlice({
	name: 'stockItem',
	initialState,
	reducers: {
		setStockItems: (state, action) => {
			const { stockItems, total, page, pageSize, totalPages } = action.payload;

			state.stockItems = stockItems;
			state.stockItemsPagination = {
				total,
				page,
				pageSize,
				totalPages
			};
		},

		addStockItem: (state, action) => {
			state.stockItems = [action.payload, ...state.stockItems].slice(
				0,
				state.stockItemsPagination.pageSize
			);
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
		},

		setStockItemHistory: (state, action) => {
			const { stockItem, history, total, page, pageSize, totalPages } =
				action.payload;

			state.stockItem = stockItem;
			state.stockItemHistory = history;
			state.stockItemHistoryPagination = {
				total,
				page,
				pageSize,
				totalPages
			};
		}
	}
});

export const {
	setStockItems,
	addStockItem,
	updateStockItem,
	removeStockItem,
	setStockItemHistory
} = stockSlice.actions;
export default stockSlice.reducer;
