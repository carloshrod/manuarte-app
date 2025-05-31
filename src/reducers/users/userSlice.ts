import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	staff: [] as Staff[],
	customers: [] as Customer[],
	topCustomers: {
		col: [] as Customer[],
		ecu: [] as Customer[]
	}
};

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		getStaff: (state, action) => {
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
			state.customers = action.payload;
		},

		setTopCustomers: (state, action) => {
			state.topCustomers = action.payload;
		},

		addCustomer: (state, action) => {
			state.customers = [action.payload, ...state.customers];
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
	getStaff,
	addStaff,
	updateStaff,
	removeStaff,
	updateStaffPermissions,
	setCustomers,
	setTopCustomers,
	addCustomer,
	updateCustomer,
	removeCustomer
} = userSlice.actions;
export default userSlice.reducer;
