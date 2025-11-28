import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	transactions: [] as Transaction[],
	transactionsPagination: {
		total: 0,
		page: 1,
		pageSize: 30,
		totalPages: 1
	} as Pagination
};

const transactionSlice = createSlice({
	name: 'transaction',
	initialState,
	reducers: {
		setTransactions: (state, action) => {
			const { transactions, total, page, pageSize, totalPages } =
				action.payload;

			state.transactions = transactions;
			state.transactionsPagination = { total, page, pageSize, totalPages };
		},

		addTransaction: (state, action) => {
			state.transactions = [action.payload, ...state.transactions].slice(
				0,
				state.transactionsPagination.pageSize
			);
		},

		updateTransactionState: (state, action) => {
			const transactionUpdated = action.payload;

			state.transactions = state.transactions.map(trans =>
				trans.id === transactionUpdated.id
					? { ...trans, state: transactionUpdated.state }
					: trans
			);
		},

		updateTransaction: (state, action) => {
			const transactionUpdated = action.payload;

			state.transactions = state.transactions.map(trans =>
				trans.id === transactionUpdated.id ? transactionUpdated : trans
			);
		}
	}
});

export const {
	setTransactions,
	addTransaction,
	updateTransactionState,
	updateTransaction
} = transactionSlice.actions;
export default transactionSlice.reducer;
