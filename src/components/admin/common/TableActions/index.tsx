import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import PopConfirm from '../PopConfirm';

interface TableActionsProps {
	onEdit: () => void;
	onDelete: () => void;
	popTitle: string;
}

const TableActions = ({ onEdit, onDelete, popTitle }: TableActionsProps) => {
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
					onClick={onEdit}
				/>
			</Tooltip>
			<PopConfirm title={popTitle} onConfirm={onDelete}>
				<Tooltip title={isDeletable ? 'Eliminar' : ''}>
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
			</PopConfirm>
		</Space>
	);
};

export default TableActions;
