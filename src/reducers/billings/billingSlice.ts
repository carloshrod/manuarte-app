import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	billings: [] as Billing[]
};

const billingSlice = createSlice({
	name: 'billing',
	initialState,
	reducers: {
		setBillings: (state, action) => {
			state.billings = action.payload;
		},

		addBilling: (state, action) => {
			state.billings = [action.payload, ...state.billings];
		},

		cancelBilling: (state, action) => {
			const canceledBilling = action.payload;
			state.billings = state.billings.map(billing =>
				billing.id === canceledBilling.id ? canceledBilling : billing
			);
		}
	}
});

export const { setBillings, addBilling, cancelBilling } = billingSlice.actions;
export default billingSlice.reducer;
