import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	staff: [] as Staff[]
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
		}
	}
});

export const { getStaff, addStaff, updateStaff, removeStaff } =
	userSlice.actions;
export default userSlice.reducer;
