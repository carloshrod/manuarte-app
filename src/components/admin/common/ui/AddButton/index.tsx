'use client';
import { openModal } from '@/reducers/ui/uiSlice';
import { ModalContent } from '@/types/enums';
import { Button } from 'antd';
import React, { ReactNode } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch } from 'react-redux';

interface AddButtonProps {
	title: string;
	modalContent: ModalContent;
	buttonLabel: string;
	appendIcon: ReactNode;
}

const AddButton = ({
	title,
	modalContent,
	buttonLabel,
	appendIcon
}: AddButtonProps) => {
	const dispatch = useDispatch();

	return (
		<Button
			variant='outlined'
			color='primary'
			icon={
				<IoMdAdd size={18} style={{ display: 'flex', alignItems: 'center' }} />
			}
			onClick={() =>
				dispatch(
					openModal({
						title,
						content: modalContent
					})
				)
			}
		>
			<p className='max-sm:hidden'>{buttonLabel}</p> {appendIcon}
		</Button>
	);
};

export default AddButton;
