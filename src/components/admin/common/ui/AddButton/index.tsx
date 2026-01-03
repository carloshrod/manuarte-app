'use client';
import { useModalStore } from '@/stores/modalStore';
import { ModalContent } from '@/types/enums';
import { Button } from 'antd';
import React, { ReactNode } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { ConfirmOperationProps } from '../ConfirmOperation';

interface AddButtonProps {
	title: string;
	modalContent: ModalContent;
	componentProps?: ConfirmOperationProps | { shopId: string };
	buttonLabel: string;
	addIcon?: boolean;
	appendIcon: ReactNode;
	dataToHandle?: any;
}

const AddButton = ({
	title,
	modalContent,
	componentProps,
	buttonLabel,
	addIcon = true,
	appendIcon,
	dataToHandle
}: AddButtonProps) => {
	const { openModal } = useModalStore.getState();

	return (
		<Button
			variant='outlined'
			color='primary'
			icon={
				addIcon && (
					<IoMdAdd
						size={18}
						style={{ display: 'flex', alignItems: 'center' }}
					/>
				)
			}
			onClick={() =>
				openModal({
					title,
					content: modalContent,
					dataToHandle,
					componentProps
				})
			}
		>
			<p className='max-sm:hidden'>{buttonLabel}</p> {appendIcon}
		</Button>
	);
};

export default AddButton;
