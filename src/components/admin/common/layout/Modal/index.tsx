import { Modal } from 'antd';
import { useModalStore } from '@/stores/modalStore';
import useModal from '@/hooks/useModal';
import { ModalContent } from '@/types/enums';

const CustomModal = () => {
	const { isOpen, title, content, closeModal } = useModalStore();
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
			onCancel={closeModal}
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
