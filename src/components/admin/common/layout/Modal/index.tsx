import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useModal from '@/hooks/useModal';
import { closeModal } from '@/reducers/ui/uiSlice';
import { ModalContent } from '@/types/enums';

const CustomModal = () => {
	const { modal } = useSelector((state: RootState) => state.ui);
	const { isOpen, title, content } = modal;
	const dispatch = useDispatch();
	const { MODAL_CONTENT } = useModal();

	const modalContent = MODAL_CONTENT[content as ModalContent] ?? null;

	const WIDTH: Record<string, number> = {
		products: 600,
		stockItems: 600
	};

	return (
		<Modal
			open={isOpen}
			title={title}
			onCancel={() => dispatch(closeModal())}
			destroyOnClose
			centered
			width={content ? WIDTH[content] : 500}
			footer={null}
		>
			{modalContent}
		</Modal>
	);
};

export default CustomModal;
