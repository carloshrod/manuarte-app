'use client';
import { openDrawer } from '@/reducers/ui/uiSlice';
import { DrawerContent } from '@/types/enums';
import { Button } from 'antd';
import { IoMdAdd } from 'react-icons/io';
import { TbFileDollar } from 'react-icons/tb';
import { useDispatch } from 'react-redux';

const OpenDrawerButton = ({ title }: { title: string }) => {
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
					openDrawer({
						title,
						content: DrawerContent.quotes
					})
				)
			}
		>
			<p className='max-sm:hidden'>Cotización</p>
			<TbFileDollar size={18} />
		</Button>
	);
};

export default OpenDrawerButton;
