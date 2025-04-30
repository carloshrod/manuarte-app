import { ConfirmTransactionProps } from '@/components/admin/common/ui/ConfirmTransaction';
import { ModalContent } from '@/types/enums';
import { create } from 'zustand';

interface ModalParams {
	title?: string | null;
	content: ModalContent | null;
	componentProps?: ConfirmTransactionProps | null;
	dataToHandle?: any;
	confirmTitle?: string | null;
	confirmText?: string | null;
}

interface ModalState extends ModalParams {
	isOpen: boolean;
	openModal: (params: ModalParams) => void;
	closeModal: () => void;
}

const initialState: Omit<ModalState, 'openModal' | 'closeModal'> = {
	isOpen: false,
	title: null,
	content: null,
	componentProps: null,
	dataToHandle: null,
	confirmTitle: null,
	confirmText: null
};

export const useModalStore = create<ModalState>(set => ({
	...initialState,
	openModal: ({
		title = null,
		content,
		componentProps = null,
		dataToHandle = null,
		confirmTitle = null,
		confirmText = null
	}) =>
		set({
			isOpen: true,
			title,
			content,
			componentProps,
			dataToHandle,
			confirmTitle,
			confirmText
		}),
	closeModal: () => set({ ...initialState })
}));
