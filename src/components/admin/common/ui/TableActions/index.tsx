import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { IoKeyOutline } from 'react-icons/io5';
import PopConfirm from '../PopConfirm';

interface TableActionsProps {
	onEdit?: () => void;
	onDelete: () => void;
	onEditPermissions?: () => void;
	popTitle: string;
	popDescription?: string;
	isEditable?: boolean;
	isDeletable?: boolean;
}

const TableActions = ({
	onEdit,
	onEditPermissions,
	onDelete,
	popTitle,
	popDescription = '¿Estás seguro de que quieres borrar este elemento?',
	isEditable = true,
	isDeletable = true
}: TableActionsProps) => {
	const onDeleteTooltip = popDescription.includes('anular')
		? 'Anular'
		: 'Eliminar';

	return (
		<Space size='small'>
			{onEdit ? (
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
						disabled={!isEditable}
					/>
				</Tooltip>
			) : null}
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
						disabled={!isEditable}
					/>
				</Tooltip>
			) : null}
			<PopConfirm
				title={popTitle}
				description={popDescription}
				onConfirm={onDelete}
			>
				<Tooltip title={isDeletable ? onDeleteTooltip : ''}>
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
