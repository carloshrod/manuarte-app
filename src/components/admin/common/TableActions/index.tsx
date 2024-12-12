import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { IoKeyOutline } from 'react-icons/io5';
import PopConfirm from '../PopConfirm';

interface TableActionsProps {
	onEdit: () => void;
	onDelete: () => void;
	onEditPermissions?: () => void;
	popTitle: string;
}

const TableActions = ({
	onEdit,
	onEditPermissions,
	onDelete,
	popTitle
}: TableActionsProps) => {
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
			{onEditPermissions ? (
				<Tooltip title={isEditable ? 'Editar permisos' : ''}>
					<Button
						type='text'
						icon={
							<IoKeyOutline
								size={20}
								color={isEditable ? '#10b981' : '#d1fae5'}
							/>
						}
						onClick={onEditPermissions}
					/>
				</Tooltip>
			) : null}
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
