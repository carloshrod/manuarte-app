import { ModalContent } from '@/enums';
import { openModal } from '@/reducers/ui/uiSlice';
import { Button, Space, Tooltip } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

const ActionsProduct = ({ record }: { record: DataTable }) => {
	const isEditable = true;
	const isDeletable = true;
	const dispatch = useDispatch();

	const handleEdit = () => {
		dispatch(
			openModal({
				title: 'Editar producto',
				content: ModalContent.products,
				dataToEdit: record
			})
		);
	};

	return (
		<Space size='small'>
			<Tooltip title={isEditable ? 'Editar' : ''}>
				<Button
					type='text'
					icon={
						<AiOutlineEdit
							size={20}
							color={isEditable ? '#0D6EFD' : '#A0AEC0'}
						/>
					}
					onClick={handleEdit}
				/>
			</Tooltip>
			<Tooltip title={isDeletable ? 'Borrar' : ''}>
				<Button
					type='text'
					icon={
						<AiOutlineDelete
							size={20}
							color={isDeletable ? '#E53535' : '#FCBABA'}
						/>
					}
					disabled={!isDeletable}
				/>
			</Tooltip>
		</Space>
	);
};

export default ActionsProduct;
