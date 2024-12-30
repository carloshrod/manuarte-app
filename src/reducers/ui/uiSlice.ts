import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modal: {
		isOpen: false,
		title: null,
		content: null,
		dataToEdit: null
	},
	drawer: {
		isOpen: false,
		title: null,
		content: null,
		dataToEdit: null
	}
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openModal: (state, action) => {
			const { isOpen } = state.modal;
			const { title, content, dataToEdit = null } = action.payload;

			state.modal = {
				isOpen: !isOpen,
				title,
				content,
				dataToEdit
			};
		},

		closeModal: state => {
			state.modal = initialState.modal;
		},

		openDrawer: (state, action) => {
			const { isOpen } = state.drawer;
			const { title, content, dataToEdit = null } = action.payload;

			state.drawer = {
				isOpen: !isOpen,
				title,
				content,
				dataToEdit
			};
		},

		closeDrawer: state => {
			state.drawer = initialState.drawer;
		}
	}
});

export const { openModal, closeModal, openDrawer, closeDrawer } =
	uiSlice.actions;
export default uiSlice.reducer;
