import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useModal from '@/hooks/useModal';
import { closeModal } from '@/reducers/ui/uiSlice';
import { ModalContent } from '@/enums';

const CustomModal = () => {
	const { modal } = useSelector((state: RootState) => state.ui);
	const { isOpen, title, content } = modal;
	const dispatch = useDispatch();
	const { MODAL_CONTENT } = useModal();

	const modalContent = MODAL_CONTENT[content as ModalContent] ?? null;

	return (
		<Modal
			open={isOpen}
			title={title}
			onCancel={() => dispatch(closeModal())}
			destroyOnClose
			centered
			width={500}
			footer={null}
		>
			{modalContent}
		</Modal>
	);
};

export default CustomModal;
