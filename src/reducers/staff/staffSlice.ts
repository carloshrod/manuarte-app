import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	staff: [] as Staff[]
};

export const staffSlice = createSlice({
	name: 'staff',
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
		}
	}
});

export const {
	setStaff,
	addStaff,
	updateStaff,
	removeStaff,
	updateStaffPermissions
} = staffSlice.actions;
export default staffSlice.reducer;
