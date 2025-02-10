import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	transactions: [] as Transaction[]
};

const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {
		setTransactions: (state, action) => {
			state.transactions = action.payload;
		},

		addTransaction: (state, action) => {
			state.transactions = [action.payload, ...state.transactions];
		}
	}
});

export const { setTransactions, addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
