import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	staff: [] as Staff[],
	customers: [] as Customer[],
	customersPagination: {
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
	} as Pagination
};

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setStaff: (state, action) => {
			state.staff = action.payload;
		},

		addStaff: (state, action) => {
			state.staff = [action.payload, ...state.staff];
		},

		updateStaff: (state, action) => {
			const updatedStaff = action.payload;
			state.staff = state.staff.map(item =>
				item.id === updatedStaff.id ? updatedStaff : item
			);
		},

		removeStaff: (state, action) => {
			state.staff = state.staff.filter(
				item => item.personId !== action.payload
			);
		},

		updateStaffPermissions: (state, action) => {
			const { extraPermissions, userId } = action.payload;

			const updatedExtraPermissions = extraPermissions.map(
				(permissionId: string) => {
					return {
						id: permissionId
					};
				}
			);

			state.staff = state.staff.map(item =>
				item.id === userId
					? { ...item, extraPermissions: updatedExtraPermissions }
					: item
			);
		},

		setCustomers: (state, action) => {
			state.customers = action.payload.customers;
			state.customersPagination = {
				total: action.payload.total,
				page: action.payload.page,
				pageSize: action.payload.pageSize,
				totalPages: action.payload.totalPages
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
		}
	}
});

export const {
	setStaff,
	addStaff,
	updateStaff,
	removeStaff,
	updateStaffPermissions,
	setCustomers,
	setTopCustomersCO,
	setTopCustomersEC,
	addCustomer,
	updateCustomer,
	removeCustomer
} = userSlice.actions;
export default userSlice.reducer;
