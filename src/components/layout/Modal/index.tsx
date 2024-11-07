import { Form, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '@/hooks/useForm';
import useModal from '@/hooks/useModal';
import { closeModal } from '@/reducers/ui/uiSlice';
import { ModalContentKey, ModalSubmitFnKey } from '@/enums';

const CustomModal = () => {
	const { modal } = useSelector((state: RootState) => state.ui);
	const { isOpen, title, content } = modal;
	const dispatch = useDispatch();
	const { form, isLoading, SUBMIT_FUNCTIONS } = useForm();
	const { MODAL_FORM_CONTENT } = useModal();

	const modalContent = MODAL_FORM_CONTENT[content as ModalContentKey] ?? null;

	const onSubmit =
		SUBMIT_FUNCTIONS[content as ModalSubmitFnKey] ?? (() => Promise.resolve());

	return (
		<Modal
			open={isOpen}
			title={title}
			okText='Agregar'
			cancelText='Cancelar'
			okButtonProps={{
				autoFocus: true,
				htmlType: 'submit',
				loading: isLoading
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
					onFinish={values => onSubmit(values)}
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
