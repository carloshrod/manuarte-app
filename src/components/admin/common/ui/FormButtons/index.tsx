import { Button, Form } from 'antd';
import { useModalStore } from '@/stores/modalStore';

interface FormButtonsProps {
	label?: string;
	isLoading: boolean;
	disabled?: boolean;
}

const FormButtons = ({
	label = 'Agregar',
	isLoading,
	disabled = false
}: FormButtonsProps) => {
	const { closeModal } = useModalStore.getState();

	return (
		<Form.Item style={{ marginBottom: 4 }} className='flex justify-end'>
			<Button
				color='danger'
				variant='outlined'
				ghost
				onClick={closeModal}
				className='w-[130px] mr-6'
				style={{ fontWeight: 600 }}
			>
				CANCELAR
			</Button>
			<Button
				type='primary'
				className='w-[130px]'
				style={{ fontWeight: 600 }}
				htmlType='submit'
				loading={isLoading}
				disabled={disabled}
			>
				{label.toUpperCase()}
			</Button>
		</Form.Item>
	);
};

export default FormButtons;
