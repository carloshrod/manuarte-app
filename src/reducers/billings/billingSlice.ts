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

		updateBilling: (state, action) => {
			const { id, status, paymentMethod } = action.payload;

			state.billings = state.billings.map(billing =>
				billing.id === id ? { ...billing, status, paymentMethod } : billing
			);
		},

		cancelBilling: (state, action) => {
			const canceledBilling = action.payload;
			state.billings = state.billings.map(billing =>
				billing.id === canceledBilling.id ? canceledBilling : billing
			);
		}
	}
});

export const { setBillings, addBilling, updateBilling, cancelBilling } =
	billingSlice.actions;
export default billingSlice.reducer;
