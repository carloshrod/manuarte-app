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
		},

		updateTransactionState: (state, action) => {
			const transactionUpdated = action.payload;

			state.transactions = state.transactions.map(trans =>
				trans.id === transactionUpdated.id
					? { ...trans, state: transactionUpdated.state }
					: trans
			);
		}
	}
});

export const { setTransactions, addTransaction, updateTransactionState } =
	transactionSlice.actions;
export default transactionSlice.reducer;
