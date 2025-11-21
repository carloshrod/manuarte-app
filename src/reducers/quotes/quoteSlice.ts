import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	quotes: [] as Quote[],
	quotesPagination: {
		total: 0,
		page: 1,
		pageSize: 10,
		totalPages: 1
	} as Pagination
};

const quoteSlice = createSlice({
	name: 'quote',
	initialState,
	reducers: {
		setQuotes: (state, action) => {
			const { quotes, total, page, pageSize, totalPages } = action.payload;

			state.quotes = quotes;
			state.quotesPagination = {
				total,
				page,
				pageSize,
				totalPages
			};
		},

		addQuote: (state, action) => {
			state.quotes = [action.payload, ...state.quotes].slice(
				0,
				state.quotesPagination.pageSize
			);
		},

		updateQuote: (state, action) => {
			const updatedQuote = action.payload;

			state.quotes = state.quotes.map(quote =>
				quote.id === updatedQuote.id ? updatedQuote : quote
			);
		},

		removeQuote: (state, action) => {
			state.quotes = state.quotes.filter(quote => quote.id !== action.payload);
		}
	}
});

export const { setQuotes, addQuote, updateQuote, removeQuote } =
	quoteSlice.actions;
export default quoteSlice.reducer;
