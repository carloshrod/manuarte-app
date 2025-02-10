import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	shops: [] as Shop[]
};

const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {
		setShops: (state, action) => {
			state.shops = action.payload;
		}
	}
});

export const { setShops } = shopSlice.actions;
export default shopSlice.reducer;
