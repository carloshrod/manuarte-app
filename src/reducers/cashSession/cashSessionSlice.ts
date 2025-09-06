import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentCashSession: {} as LastCashSession
};

const cashSessionSlice = createSlice({
	name: 'cashSession',
	initialState,
	reducers: {
		setCashSession: (state, action) => {
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
		}
	}
});

export const { setCashSession, addCashMovement } = cashSessionSlice.actions;
export default cashSessionSlice.reducer;
