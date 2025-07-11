'use client';
import { billingServices } from '@/services/billingServices';
import { quoteServices } from '@/services/quoteServices';
import { useDrawerStore } from '@/stores/drawerStore';
import { DrawerContent } from '@/types/enums';
import { formatCurrency, formatDate } from '@/utils/formats';
import { PAYMENT_METHOD_MAP } from '@/utils/mappings';
import { Tooltip } from 'antd';

const RecentActivityItem = ({ item }: { item: Billing | Quote }) => {
	const { openDrawer } = useDrawerStore.getState();
	const isBilling = 'paymentMethods' in item;

	const handleShowDetails = async () => {
		const dataToHandle = isBilling
			? await billingServices.getOne({
					serialNumber: item.serialNumber,
					server: false
				})
			: await quoteServices.getOne({
					serialNumber: item.serialNumber,
					server: false
				});

		openDrawer({
			title: `${isBilling ? 'Compra' : 'Cotización'} - ${item?.serialNumber}`,
			content: DrawerContent.recentActivityDetails,
			dataToHandle
		});
	};

	return (
		<Tooltip title='Ver items' placement='topLeft'>
			<div
				className='flex flex-col gap-2 pb-2 cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200'
				onClick={handleShowDetails}
			>
				<span className='text-[#00000073] font-bold'>
					{isBilling ? 'Compra' : 'Cotización'}
				</span>
				<span className='text-[#000000E0]'>
					<span className='text-[#00000073] font-semibold'>Serial: </span>
					{item?.serialNumber}
				</span>
				{isBilling ? (
					<span className='text-[#000000E0]'>
						<span className='text-[#00000073] font-semibold'>
							Métodos de pago:{' '}
						</span>
						{item?.paymentMethods?.map(p => PAYMENT_METHOD_MAP[p]).join(', ')}
					</span>
				) : null}
				{'subtotal' in item ? (
					<span className='text-[#000000E0]'>
						<span className='text-[#00000073] font-semibold'>Total: </span>
						{formatCurrency(item?.subtotal)}
					</span>
				) : null}
				<span className='text-[#00000073] font-semibold'>
					{formatDate(item?.createdDate)}
				</span>
			</div>
		</Tooltip>
	);
};

export default RecentActivityItem;
