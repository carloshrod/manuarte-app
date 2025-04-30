'use client';
import { Button } from 'antd';
import { IoMdAdd } from 'react-icons/io';
import { DrawerContent } from '@/types/enums';
import { ReactNode } from 'react';
import { useDrawerStore } from '@/stores/drawerStore';

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
	const { openDrawer } = useDrawerStore.getState();

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
				openDrawer({
					title,
					content: drawerContent
				})
			}
		>
			<p className='max-sm:hidden'>{buttonLabel}</p>
			{appendIcon}
		</Button>
	);
};

export default OpenDrawerButton;
