import { Button, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/reducers/ui/uiSlice';

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
	const dispatch = useDispatch();

	return (
		<Form.Item style={{ marginBottom: 4 }} className='flex justify-end'>
			<Button
				color='danger'
				variant='outlined'
				ghost
				onClick={() => dispatch(closeModal())}
				className='w-[130px] mr-6'
			>
				Cancelar
			</Button>
			<Button
				type='primary'
				className='w-[130px]'
				htmlType='submit'
				loading={isLoading}
				disabled={disabled}
			>
				{label}
			</Button>
		</Form.Item>
	);
};

export default FormButtons;
