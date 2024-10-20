import { closeModal } from '@/reducers/ui/uiSlice';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

type ContentKey = 'products' | 'productVariants' | 'productCategories';

const CustomModal = () => {
	const { modal } = useSelector((state: RootState) => state.ui);
	const { isOpen, title, content } = modal;
	const dispatch = useDispatch();

	const CONTENT: Record<ContentKey, React.ReactNode> = {
		products: <p>Form Products</p>,
		productVariants: <p>Form ProductVariants</p>,
		productCategories: <p>Form ProductCategories</p>
	};

	const modalContent =
		content && typeof content === 'string' ? (
			CONTENT[content as ContentKey]
		) : (
			<p>Contenido no disponible.</p>
		);

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
