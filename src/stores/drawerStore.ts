import { DrawerContent } from '@/types/enums';
import { create } from 'zustand';

interface DrawerParams {
	title: string | null;
	content: DrawerContent | null;
	dataToHandle?: any;
	customerInfo?: ExistingCustomer | null;
	noCustomer?: boolean;
}

interface DrawerState extends DrawerParams {
	isOpen: boolean;
	openDrawer: (params: DrawerParams) => void;
	updateDrawer: (params: Partial<DrawerParams>) => void;
	closeDrawer: () => void;
}

const initialState: Omit<
	DrawerState,
	'openDrawer' | 'closeDrawer' | 'updateDrawer'
> = {
	isOpen: false,
	title: null,
	content: null,
	dataToHandle: null,
	customerInfo: null,
	noCustomer: false
};

export const useDrawerStore = create<DrawerState>(set => ({
	...initialState,
	openDrawer: ({
		title,
		content,
		dataToHandle = null,
		customerInfo = null,
		noCustomer = false
	}) =>
		set({
			isOpen: true,
			title,
			content,
			dataToHandle,
			customerInfo,
			noCustomer
		}),
	updateDrawer: ({ customerInfo = null, noCustomer = false }) =>
		set(state => ({
			...state,
			customerInfo,
			noCustomer
		})),
	closeDrawer: () => set({ ...initialState })
}));
