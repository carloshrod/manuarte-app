import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentCashSession: {} as CurrentCashSession,
	bankTransferMovements: [] as BankTransferMovement[]
};

const financialFlowSlice = createSlice({
	name: 'financialFlow',
	initialState,
	reducers: {
		setCurrentCashSession: (state, action) => {
			state.currentCashSession = action.payload;
		},

		addCashMovement: (state, action) => {
			const { currentCashSession } = state;
			const { data } = currentCashSession;
			const { newCashMovement, newBalance } = action.payload;

			state.currentCashSession = {
				...currentCashSession,
				balance: newBalance,
				data: {
					...data,
					movements: [newCashMovement, ...data.movements]
				}
			};
		},

		setBankTransferMovements: (state, action) => {
			state.bankTransferMovements = action.payload;
		}
	}
});

export const {
	setCurrentCashSession,
	addCashMovement,
	setBankTransferMovements
} = financialFlowSlice.actions;
export default financialFlowSlice.reducer;
