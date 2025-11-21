import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	billings: [] as Billing[],
	billingsPagination: {
		total: 0,
		page: 1,
		pageSize: 10,
		totalPages: 1
	} as Pagination
};

const billingSlice = createSlice({
	name: 'billing',
	initialState,
	reducers: {
		setBillings: (state, action) => {
			const { billings, total, page, pageSize, totalPages } = action.payload;

			state.billings = billings;
			state.billingsPagination = {
				total,
				page,
				pageSize,
				totalPages
			};
		},

		addBilling: (state, action) => {
			state.billings = [action.payload, ...state.billings];
		},

		updateBilling: (state, action) => {
			const { id, status, effectiveDate, paymentMethods } = action.payload;

			state.billings = state.billings.map(billing =>
				billing.id === id
					? {
							...billing,
							status,
							effectiveDate,
							paymentMethods: Array.from(
								new Set([...billing.paymentMethods, ...paymentMethods])
							)
						}
					: billing
			);
		},

		cancelBilling: (state, action) => {
			const canceledBilling = action.payload;
			state.billings = state.billings.map(billing =>
				billing.id === canceledBilling.id ? canceledBilling : billing
			);
		},

		removeBilling: (state, action) => {
			state.billings = state.billings.filter(
				billing => billing.id !== action.payload
			);
		}
	}
});

export const {
	setBillings,
	addBilling,
	updateBilling,
	cancelBilling,
	removeBilling
} = billingSlice.actions;
export default billingSlice.reducer;
