import { useEffect, useState } from 'react';
import { Button, Col, Divider, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import TransactionsItemList from '../TransactionItemsList';
import { transactionServices } from '@/services/transactionServices';
import { closeDrawer, openDrawer } from '@/reducers/ui/uiSlice';
import { STATES_MAP, TYPES_MAP } from '@/utils/mappings';
import { DrawerContent, TransactionType } from '@/types/enums';
import { useSession } from 'next-auth/react';

const TransactionDetails = () => {
	const {
		drawer: { dataToEdit }
	} = useSelector((state: RootState) => state.ui);
	const [items, setItems] = useState<TransactionItem[]>([]);
	const dispatch = useDispatch();
	const { data: session } = useSession();
	const isAdmin = session?.user?.roleName === 'admin';

	const stockId =
		dataToEdit?.type === TransactionType.ENTER
			? dataToEdit?.toId
			: dataToEdit?.fromId;

	const fetchItems = async () => {
		const data = await transactionServices.getItems(dataToEdit?.id, stockId);
		if (data) {
			setItems(data);
		}
	};

	useEffect(() => {
		fetchItems();
	}, [dataToEdit?.id]);

	const isTransferInProgress =
		dataToEdit?.type === TransactionType.TRANSFER &&
		dataToEdit?.state === 'PROGRESS';

	const handleEdit = () => {
		dispatch(
			openDrawer({
				title: 'Transacción',
				content: DrawerContent.transfer,
				dataToEdit: { ...dataToEdit, items }
			})
		);
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
							{dataToEdit?.fromName ?? 'NA'}
						</span>
					</div>
				</Col>
				<Col span={12}>
					<div className='flex flex-col flex-1 gap-2 mb-4'>
						<span>Destino</span>
						<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
							{dataToEdit?.toName ?? 'NA'}
						</span>
					</div>
				</Col>
				{dataToEdit?.description ? (
					<Col span={24}>
						<div className='flex flex-col flex-1 gap-2 mb-4'>
							<span>Descripción</span>
							<span className='px-3 py-2 bg-[#e5e5e5] rounded-md'>
								{dataToEdit?.description}
							</span>
						</div>
					</Col>
				) : null}
				<Col span={8}>
					<div className='flex flex-col flex-1 gap-2 mb-4'>
						<span>Tipo</span>
						<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
							{TYPES_MAP[dataToEdit?.type]}
						</span>
					</div>
				</Col>
				<Col span={8}>
					<div className='flex flex-col flex-1 gap-2 mb-4'>
						<span>Estado</span>
						<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
							{STATES_MAP[dataToEdit?.state]}
						</span>
					</div>
				</Col>
				<Col span={8}>
					<div className='flex flex-col flex-1 gap-2 mb-4'>
						<span>Fecha de Transacción</span>
						<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
							{moment(dataToEdit?.createdDate)
								.startOf('day')
								.format('YYYY/MM/DD')}
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
					onClick={() => dispatch(closeDrawer())}
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
