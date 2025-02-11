import { closeDrawer } from '@/reducers/ui/uiSlice';
import { transactionServices } from '@/services/transactionServices';
import { STATES_MAP, TYPES_MAP } from '@/utils/mappings';
import { Button, Col, Divider, Row } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TransactionsItemList from '../TransactionItemsList';

const TransactionDetails = () => {
	const {
		drawer: { dataToEdit }
	} = useSelector((state: RootState) => state.ui);
	const [items, setItems] = useState<TransactionItem[]>([]);
	const dispatch = useDispatch();

	const fetchItems = async () => {
		const data = await transactionServices.getItems(dataToEdit?.id);
		if (data) {
			setItems(data);
		}
	};

	useEffect(() => {
		fetchItems();
	}, [dataToEdit?.id]);

	const suppliers = [
		{
			id: '5feee178-3140-44d7-80ce-67db48fd8789',
			name: 'Manuarte'
		},
		{
			id: 'bfda9954-7bff-4359-a235-dfce36bfed8c',
			name: 'Otros'
		}
	];

	const supplierName = suppliers.find(
		supl => supl.id === dataToEdit?.supplierId
	)?.name;

	return (
		<div className='h-full flex flex-col justify-between'>
			<Row gutter={32} className='items-center'>
				<Col span={12}>
					<div className='flex flex-col flex-1 gap-2 mb-4'>
						<span>{dataToEdit?.supplierId ? 'Proveedor' : 'Origen'}</span>
						<span className='px-3 py-1 bg-[#e5e5e5] rounded-md'>
							{dataToEdit?.supplierId ? supplierName : dataToEdit?.fromName}
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
				<Col span={24}>
					<div className='flex flex-col flex-1 gap-2 mb-4'>
						<span>Descripción</span>
						<span className='px-3 py-2 bg-[#e5e5e5] rounded-md'>
							{dataToEdit?.description}
						</span>
					</div>
				</Col>
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
				<TransactionsItemList items={items} type={dataToEdit?.type} />
			</Row>
			<div className='flex flex-col items-end py-4 bg-white'>
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
			</div>
		</div>
	);
};

export default TransactionDetails;
