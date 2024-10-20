import { Button, Space, Tooltip } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const ActionsProduct = ({ record }: { record: DataTable }) => {
	const isEditable = true;
	const isDeletable = true;

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
