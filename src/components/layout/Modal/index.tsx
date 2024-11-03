import ProductForm from '@/components/admin/products/ProductForm';
import { ModalContentKey } from '@/enums';
import { closeModal } from '@/reducers/ui/uiSlice';
import { Form, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

interface Values {
	name?: string;
	description?: string;
}

const CustomModal = () => {
	const { modal } = useSelector((state: RootState) => state.ui);
	const { isOpen, title, content } = modal;
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const CONTENT: Record<ModalContentKey, React.ReactNode> = {
		[ModalContentKey.Products]: <ProductForm />,
		[ModalContentKey.ProductVariants]: <p>Form ProductVariants</p>,
		[ModalContentKey.ProductCategories]: <p>Form ProductCategories</p>,
		[ModalContentKey.Users]: <p>Form Users</p>
	};

	const modalContent =
		content && typeof content === 'string'
			? CONTENT[content as ModalContentKey]
			: null;

	const onCreate = (values: Values) => {
		console.log('Received values of form: ', values);
	};

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
			cancelButtonProps={{
				variant: 'outlined',
				color: 'danger'
			}}
			onCancel={() => dispatch(closeModal())}
			destroyOnClose
			centered
			width={500}
			modalRender={dom => (
				<Form
					layout='vertical'
					form={form}
					name='form_in_modal'
					initialValues={{ modifier: 'public' }}
					clearOnDestroy
					onFinish={values => onCreate(values)}
				>
					{dom}
				</Form>
			)}
		>
			{modalContent}
		</Modal>
	);
};

export default CustomModal;
