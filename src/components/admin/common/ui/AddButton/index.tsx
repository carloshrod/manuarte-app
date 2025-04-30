'use client';
import { useModalStore } from '@/stores/modalStore';
import { ModalContent } from '@/types/enums';
import { Button } from 'antd';
import React, { ReactNode } from 'react';
import { IoMdAdd } from 'react-icons/io';

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
	const { openModal } = useModalStore.getState();

	return (
		<Button
			variant='outlined'
			color='primary'
			icon={
				<IoMdAdd size={18} style={{ display: 'flex', alignItems: 'center' }} />
			}
			onClick={() => openModal({ title, content: modalContent })}
		>
			<p className='max-sm:hidden'>{buttonLabel}</p> {appendIcon}
		</Button>
	);
};

export default AddButton;
