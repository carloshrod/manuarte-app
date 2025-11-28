import useTable from '@/hooks/useTable';
import { Badge, TableColumnsType, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import {
	TRANSACTION_STATES_MAP,
	TRANSACTION_TYPES_MAP
} from '@/utils/mappings';
import { TAG_COLORS } from '@/hooks/utils';
import { formatDate } from '@/utils/formats';
import TransactionActions from '../TransactionAction';

const TransactionCols = () => {
	const { getColumnDateFilterProps } = useTable();

	const transactionsColumns: TableColumnsType<Transaction> = [
		{
			title: 'ESTADO',
			dataIndex: 'state',
			key: 'state',
			filters: [
				{
					text: 'Realizado',
					value: 'SUCCESS'
				},
				{
					text: 'En Progreso',
					value: 'PROGRESS'
				}
			],
			onFilter: (value, record) => record.state.indexOf(value as string) === 0,
			render: value => {
				return (
					<span className='flex items-center gap-1'>
						{TRANSACTION_STATES_MAP[value]}
						<Badge
							count={
								<CheckCircleOutlined
									style={{ color: value === 'SUCCESS' ? '#10b981' : '#808080' }}
								/>
							}
						/>
					</span>
				);
			},
			width: 120
		},
		{
			title: 'TIPO',
			dataIndex: 'type',
			key: 'type',
			filters: [
				{
					text: 'Entrada',
					value: 'ENTER'
				},
				{
					text: 'Salida',
					value: 'EXIT'
				},
				{
					text: 'Transferencia',
					value: 'TRANSFER'
				}
			],
			onFilter: (value, record) => record.type.indexOf(value as string) === 0,
			render: value => {
				return (
					<span className='flex items-center'>
						<Tag color={TAG_COLORS[value]}>{TRANSACTION_TYPES_MAP[value]}</Tag>
					</span>
				);
			},
			width: 120
		},
		{
			title: 'ORIGEN',
			dataIndex: 'fromId',
			key: 'fromId',
			filters: [
				{
					text: 'Fabrica Cascajal',
					value: '6de3518b-a625-4b3e-8907-782ab0bda193'
				},
				{
					text: 'Barranquilla',
					value: '8340352a-1202-4a2d-93c1-d9c267ac339d'
				},
				{
					text: 'Cartagena',
					value: '5f5940d4-669b-47fc-a2a7-68e222a75b98'
				},
				{
					text: 'Quito',
					value: '59999031-e678-4d76-849f-38489365aab0'
				}
			],
			onFilter: (value, record) =>
				record?.fromId?.indexOf(value as string) === 0,
			render: (_value: string, record) => record?.fromName ?? '--',
			width: 120
		},
		{
			title: 'DESTINO',
			dataIndex: 'toId',
			key: 'toId',
			filters: [
				{
					text: 'Fabrica Cascajal',
					value: '6de3518b-a625-4b3e-8907-782ab0bda193'
				},
				{
					text: 'Barranquilla',
					value: '8340352a-1202-4a2d-93c1-d9c267ac339d'
				},
				{
					text: 'Cartagena',
					value: '5f5940d4-669b-47fc-a2a7-68e222a75b98'
				},
				{
					text: 'Quito',
					value: '59999031-e678-4d76-849f-38489365aab0'
				}
			],
			onFilter: (value, record) => record?.toId?.indexOf(value as string) === 0,
			render: (_value: string, record) => record?.toName ?? '--',
			width: 120
		},
		{
			title: 'DESCRIPCIÓN',
			dataIndex: 'description',
			key: 'description',
			render: (value: string) =>
				value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '--',
			width: 300
		},
		{
			title: 'FECHA',
			dataIndex: 'createdDate',
			key: 'createdDate',
			...getColumnDateFilterProps('createdDate'),
			render: (value: string) => (
				<span>{value ? formatDate(value) : '--'}</span>
			),
			width: 140
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record: Transaction) => (
				<TransactionActions record={record} />
			),
			width: 100,
			align: 'center'
		}
	];

	return { transactionsColumns };
};

export default TransactionCols;
