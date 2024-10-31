import { ModalContentKey } from '@/enums';
import { closeModal } from '@/reducers/ui/uiSlice';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const CustomModal = () => {
	const { modal } = useSelector((state: RootState) => state.ui);
	const { isOpen, title, content } = modal;
	const dispatch = useDispatch();

	const CONTENT: Record<ModalContentKey, React.ReactNode> = {
		[ModalContentKey.Products]: <p>Form Products</p>,
		[ModalContentKey.ProductVariants]: <p>Form ProductVariants</p>,
		[ModalContentKey.ProductCategories]: <p>Form ProductCategories</p>,
		[ModalContentKey.Users]: <p>Form Users</p>
	};

	const modalContent =
		content && typeof content === 'string'
			? CONTENT[content as ModalContentKey]
			: null;

	return (
		<Modal
			open={isOpen}
			title={title}
			okText='Agregar'
			cancelText='Cancelar'
			okButtonProps={{
				autoFocus: true,
				htmlType: 'submit'
			}}
			onCancel={() => dispatch(closeModal())}
			destroyOnClose
			centered
			width={450}
			footer={null}
		>
			{modalContent}
		</Modal>
	);
};

export default CustomModal;
