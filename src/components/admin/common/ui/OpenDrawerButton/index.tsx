'use client';
import { Button } from 'antd';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { openDrawer } from '@/reducers/ui/uiSlice';
import { DrawerContent } from '@/types/enums';
import { ReactNode } from 'react';

interface OpenDrawerButtonProps {
	title: string;
	drawerContent: DrawerContent;
	buttonLabel: string;
	prependIcon?: boolean;
	appendIcon: ReactNode;
}

const OpenDrawerButton = ({
	title,
	drawerContent,
	buttonLabel,
	prependIcon = true,
	appendIcon
}: OpenDrawerButtonProps) => {
	const dispatch = useDispatch();

	return (
		<Button
			variant='outlined'
			color='primary'
			icon={
				prependIcon ? (
					<IoMdAdd
						size={18}
						style={{ display: 'flex', alignItems: 'center' }}
					/>
				) : null
			}
			onClick={() =>
				dispatch(
					openDrawer({
						title,
						content: drawerContent
					})
				)
			}
		>
			<p className='max-sm:hidden'>{buttonLabel}</p>
			{appendIcon}
		</Button>
	);
};

export default OpenDrawerButton;
