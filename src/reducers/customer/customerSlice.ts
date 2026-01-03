import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	customers: [] as Customer[],
	customersPagination: {
		total: 0,
		page: 1,
		pageSize: 10,
		totalPages: 1
	} as Pagination,
	customerBalanceMovements: [] as CustomerBalanceMovement[],
	customerBalanceMovementsPagination: {
		total: 0,
		page: 1,
		pageSize: 10,
		totalPages: 1
	} as Pagination,
	topCustomersCO: [] as Customer[],
	topCustomersCoPagination: {
		total: 0,
		page: 1,
		pageSize: 10,
		totalPages: 1
	} as Pagination,
	topCustomersEC: [] as Customer[],
	topCustomersEcPagination: {
		total: 0,
		page: 1,
		pageSize: 10,
		totalPages: 1
	} as Pagination,
	balance: 0 as number
};

export const customerSlice = createSlice({
	name: 'customers',
	initialState,
	reducers: {
		setCustomers: (state, action) => {
			state.customers = action.payload.customers;
			state.customersPagination = {
				total: action.payload.total,
				page: action.payload.page,
				pageSize: action.payload.pageSize,
				totalPages: action.payload.totalPages
			};
		},

		setCustomerBalanceMovements: (state, action) => {
			const { movements, total, page, pageSize, totalPages } = action.payload;

			state.customerBalanceMovements = movements;
			state.customerBalanceMovementsPagination = {
				total,
				page,
				pageSize,
				totalPages
			};
		},

		setTopCustomersCO: (state, action) => {
			state.topCustomersCO = action.payload.topCustomers;
			state.topCustomersCoPagination = {
				total: action.payload.total,
				page: action.payload.page,
				pageSize: action.payload.pageSize,
				totalPages: action.payload.totalPages
			};
		},

		setTopCustomersEC: (state, action) => {
			state.topCustomersEC = action.payload.topCustomers;
			state.topCustomersEcPagination = {
				total: action.payload.total,
				page: action.payload.page,
				pageSize: action.payload.pageSize,
				totalPages: action.payload.totalPages
			};
		},

		addCustomer: (state, action) => {
			state.customers = [action.payload, ...state.customers].slice(
				0,
				state.customersPagination.pageSize
			);
		},

		updateCustomer: (state, action) => {
			const updatedCustomer = action.payload;

			state.customers = state.customers.map(item =>
				item.id === updatedCustomer.id ? updatedCustomer : item
			);
		},

		removeCustomer: (state, action) => {
			state.customers = state.customers.filter(
				item => item.personId !== action.payload
			);
		},

		addCustomerBalanceMovement: (state, action) => {
			state.customerBalanceMovements = [
				action.payload,
				...state.customerBalanceMovements
			].slice(0, state.customerBalanceMovementsPagination.pageSize);
		},

		setBalance: (state, action) => {
			state.balance = action.payload;
		}
	}
});

export const {
	setCustomers,
	setCustomerBalanceMovements,
	setTopCustomersCO,
	setTopCustomersEC,
	addCustomer,
	updateCustomer,
	removeCustomer,
	addCustomerBalanceMovement,
	setBalance
} = customerSlice.actions;
export default customerSlice.reducer;
