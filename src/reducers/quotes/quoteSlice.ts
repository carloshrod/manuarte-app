import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	quotes: [] as Quote[]
};

const quoteSlice = createSlice({
	name: 'quote',
	initialState,
	reducers: {
		getQuotes: (state, action) => {
			state.quotes = action.payload;
		},

		addQuote: (state, action) => {
			state.quotes = [action.payload, ...state.quotes];
		},

		editQuote: (state, action) => {
			const updatedQuote = action.payload;

			state.quotes = state.quotes.map(item =>
				item.id === updatedQuote.id ? updatedQuote : item
			);
		},

		removeQuote: (state, action) => {
			state.quotes = state.quotes.filter(item => item.id !== action.payload);
		}
	}
});

export const { getQuotes, addQuote, editQuote, removeQuote } =
	quoteSlice.actions;
export default quoteSlice.reducer;
