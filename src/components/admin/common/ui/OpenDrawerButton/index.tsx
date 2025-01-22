'use client';
import { openDrawer } from '@/reducers/ui/uiSlice';
import { DrawerContent } from '@/types/enums';
import { Button } from 'antd';
import { IoMdAdd } from 'react-icons/io';
import { PiInvoice } from 'react-icons/pi';
import { TbFileDollar } from 'react-icons/tb';
import { useDispatch } from 'react-redux';

const OpenDrawerButton = ({ isQuote }: { isQuote: boolean }) => {
	const dispatch = useDispatch();

	const label = isQuote ? 'Cotización' : 'Factura';
	const contentDrawer = isQuote ? DrawerContent.quotes : DrawerContent.billings;

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
						title: `Crear ${label}`,
						content: contentDrawer
					})
				)
			}
		>
			<p className='max-sm:hidden'>{label}</p>
			{label === 'Factura' ? (
				<PiInvoice size={18} />
			) : (
				<TbFileDollar size={18} />
			)}
		</Button>
	);
};

export default OpenDrawerButton;
