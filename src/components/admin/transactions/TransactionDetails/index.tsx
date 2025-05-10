import { useEffect, useState } from 'react';
import { Button, Col, Divider, Row } from 'antd';
import TransactionsItemList from '../TransactionItemsList';
import { transactionServices } from '@/services/transactionServices';
import { STATES_MAP, TYPES_MAP } from '@/utils/mappings';
import { DrawerContent, TransactionType } from '@/types/enums';
import { useSession } from 'next-auth/react';
import { useDrawerStore } from '@/stores/drawerStore';
import { formatDate } from '@/utils/formats';

const TransactionDetails = () => {
	const { dataToHandle, openDrawer, closeDrawer } = useDrawerStore.getState();
	const [items, setItems] = useState<TransactionItem[]>([]);
	const { data: session } = useSession();
	const isAdmin = session?.user?.roleName === 'admin';

	const stockId =
		dataToHandle?.type === TransactionType.ENTER
			? dataToHandle?.toId
			: dataToHandle?.fromId;

	const fetchItems = async () => {
		const data = await transactionServices.getItems(dataToHandle?.id, stockId);
		if (data) {
			setItems(data);
		}
	};

	useEffect(() => {
		fetchItems();
	}, [dataToHandle?.id]);

	const isTransferInProgress =
		dataToHandle?.type === TransactionType.TRANSFER &&
		dataToHandle?.state === 'PROGRESS';

	const handleEdit = () => {
		openDrawer({
			title: 'Transacción',
			content: DrawerContent.transfer,
			dataToHandle: { ...dataToHandle, items }
		});
	};

	const itemsCount = items?.reduce((acc, item) => {
		return acc + Number(item.quantity);
	}, 0);

	return (
		<div className='h-full flex flex-col justify-between'>
			<Row gutter={32} className='items-center'>
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
				{dataToHandle?.description ? (
					<Col span={24}>
						<div className='flex flex-col flex-1 gap-2 mb-4'>
							<span>Descripción</span>
							<span className='px-3 py-2 bg-[#e5e5e5] rounded-md'>
								{dataToHandle?.description}
							</span>
						</div>
					</Col>
				) : null}
				<Col span={8}>
					<div className='flex flex-col flex-1 gap-2 mb-4'>
						<span>Tipo</span>
						<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
							{TYPES_MAP[dataToHandle?.type]}
						</span>
					</div>
				</Col>
				<Col span={8}>
					<div className='flex flex-col flex-1 gap-2 mb-4'>
						<span>Estado</span>
						<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
							{STATES_MAP[dataToHandle?.state]}
						</span>
					</div>
				</Col>
				<Col span={8}>
					<div className='flex flex-col flex-1 gap-2 mb-4'>
						<span>Fecha de Transacción</span>
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
				<TransactionsItemList items={items} />
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

				{isTransferInProgress && isAdmin ? (
					<Button
						color='primary'
						variant='outlined'
						className='w-[90%] max-w-[200px]'
						style={{ fontWeight: 600 }}
						htmlType='button'
						onClick={handleEdit}
					>
						EDITAR
					</Button>
				) : null}
			</div>
		</div>
	);
};

export default TransactionDetails;
