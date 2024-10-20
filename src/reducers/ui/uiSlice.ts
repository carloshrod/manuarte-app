import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modal: {
		isOpen: false,
		title: null,
		content: null
	}
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openModal: (state, action) => {
			const { isOpen } = state.modal;
			const { title, content } = action.payload;

			state.modal = {
				isOpen: !isOpen,
				title,
				content
			};
		},
		closeModal: state => {
			state.modal = initialState.modal;
		}
	}
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
