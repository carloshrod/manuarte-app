import { useEffect, useState } from 'react';
import { Button, Col, Divider, Row } from 'antd';
import TransactionsItemList from '../TransactionItemsList';
import { transactionLibs } from '@/libs/api/transaction';
import { billingLibs } from '@/libs/api/billing';
import { useDrawerStore } from '@/stores/drawerStore';
import {
	TRANSACTION_STATES_MAP,
	TRANSACTION_TYPES_MAP
} from '@/utils/mappings';
import { formatDate } from '@/utils/formats';
import { DrawerContent, TransactionType } from '@/types/enums';

const TransactionDetails = () => {
	const { dataToHandle, closeDrawer, content } = useDrawerStore.getState();
	const [items, setItems] = useState<TransactionItem[]>([]);
	const [customer, setCustomer] = useState(null);
	const isBilling = dataToHandle?.type === 'BILLING';

	const stockId =
		dataToHandle?.type === TransactionType.ENTER
			? dataToHandle?.toId
			: dataToHandle?.fromId;

	const fetchTransactionItems = async () => {
		const transactionId =
			content === DrawerContent.transactionDetails
				? dataToHandle?.id
				: dataToHandle?.transactionId;

		const data = await transactionLibs.getItems(transactionId, stockId);

		if (data) {
			setItems(data);
		}
	};

	const fetchBillingItems = async () => {
		const data = await billingLibs.getOne({
			serialNumber: dataToHandle?.identifier
		});

		if (data) {
			setCustomer(data?.fullName);
			setItems(data?.items);
		}
	};

	useEffect(() => {
		if (isBilling) {
			fetchBillingItems();
		} else {
			fetchTransactionItems();
		}
	}, [dataToHandle?.id]);

	const itemsCount = items?.reduce((acc, item) => {
		return acc + Number(item.quantity);
	}, 0);

	return (
		<div className='h-full flex flex-col justify-between'>
			<Row gutter={32} className='items-center'>
				{isBilling ? null : (
					<>
						<Col span={12}>
							<div className='flex flex-col flex-1 gap-2 mb-4'>
								<span>Origen</span>
								<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
									{dataToHandle?.fromName ?? 'NA'}
								</span>
							</div>
						</Col>
						<Col span={12}>
							<div className='flex flex-col flex-1 gap-2 mb-4'>
								<span>Destino</span>
								<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
									{dataToHandle?.toName ?? 'NA'}
								</span>
							</div>
						</Col>
					</>
				)}

				{dataToHandle?.description || dataToHandle?.identifier ? (
					<Col span={24}>
						<div className='flex flex-col flex-1 gap-2 mb-4'>
							<span>{isBilling ? 'Cliente' : 'Descripción'}</span>
							<span className='px-3 py-2 bg-[#e5e5e5] rounded-md'>
								{isBilling
									? (customer ?? 'Consumidor Final')
									: dataToHandle?.description || dataToHandle?.identifier}
							</span>
						</div>
					</Col>
				) : null}

				<Col span={8}>
					<div className='flex flex-col flex-1 gap-2 mb-4'>
						<span>{isBilling ? 'Número de serial' : 'Tipo'}</span>
						<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
							{isBilling
								? dataToHandle?.identifier
								: TRANSACTION_TYPES_MAP[dataToHandle?.type]}
						</span>
					</div>
				</Col>

				<Col span={8}>
					<div className='flex flex-col flex-1 gap-2 mb-4'>
						<span>Estado</span>
						<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
							{isBilling
								? 'Pagada'
								: TRANSACTION_STATES_MAP[dataToHandle?.state]}
						</span>
					</div>
				</Col>

				<Col span={8}>
					<div className='flex flex-col flex-1 gap-2 mb-4'>
						<span>Fecha</span>
						<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
							{formatDate(dataToHandle?.createdDate) ?? '--'}
						</span>
					</div>
				</Col>

				<Divider orientation='left'>Productos</Divider>
				{items?.length > 0 ? (
					<Col>
						<p className='pb-6'># Total de Items: {itemsCount}</p>
					</Col>
				) : null}
				<TransactionsItemList items={items} isBilling={isBilling} />
			</Row>

			<div className='flex justify-end gap-4 py-4 bg-white'>
				<Button
					color='danger'
					variant='outlined'
					className='w-[90%] max-w-[200px]'
					style={{ fontWeight: 600 }}
					htmlType='button'
					onClick={closeDrawer}
				>
					CERRAR
				</Button>
			</div>
		</div>
	);
};

export default TransactionDetails;
