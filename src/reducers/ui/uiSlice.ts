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
		dataToEdit: null,
		customerInfo: null,
		noCustomer: false
	}
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openModal: (state, action) => {
			const { title, content, dataToEdit = null } = action.payload;

			state.modal = {
				isOpen: true,
				title,
				content,
				dataToEdit
			};
		},

		closeModal: state => {
			state.modal = initialState.modal;
		},

		openDrawer: (state, action) => {
			const { title, content, dataToEdit = null } = action.payload;
			const noCustomer = dataToEdit && Boolean(!dataToEdit?.customerId);

			state.drawer = {
				...state.drawer,
				isOpen: true,
				title,
				content,
				dataToEdit,
				noCustomer
			};
		},

		updateDrawer: (state, action) => {
			const { customerInfo = null, noCustomer = false } = action.payload;

			state.drawer = {
				...state.drawer,
				customerInfo,
				noCustomer
			};
		},

		closeDrawer: state => {
			state.drawer = initialState.drawer;
		}
	}
});

export const { openModal, closeModal, openDrawer, updateDrawer, closeDrawer } =
	uiSlice.actions;
export default uiSlice.reducer;
