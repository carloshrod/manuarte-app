import { useParams } from 'next/navigation';
import { Badge, TableColumnsType, Tag, Tooltip } from 'antd';
import { CheckCircleOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { IoInformationCircleOutline } from 'react-icons/io5';
import TransactionActions from '@/components/admin/transactions/TransactionAction';
import useTable from './useTable';
import { formatCurrency, formatDate } from '@/utils/formats';
import {
	CASH_MOVEMENT_CAT_MAP,
	PAYMENT_METHOD_MAP,
	TRANSACTION_STATES_MAP,
	TRANSACTION_TYPES_MAP
} from '@/utils/mappings';
import {
	COL_PAYMENT_METHOD_FILTER,
	ECU_PAYMENT_METHOD_FILTER,
	TAG_COLORS,
	CASH_MOVEMENT_CAT_FILTER
} from './utils';
import { PaymentMethod } from '@/types/enums';
import CopyableText from '@/components/admin/common/ui/CopyableText';

const useTableColumns = () => {
	const { getColumnSearchProps, getColumnDateFilterProps } = useTable();
	const params = useParams();

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
			dataIndex: 'fromName',
			key: 'fromName',
			filters: [
				{
					text: 'Fabrica Cascajal',
					value: 'Fabrica Cascajal'
				},
				{
					text: 'Barranquilla',
					value: 'Barranquilla'
				},
				{
					text: 'Cartagena',
					value: 'Cartagena'
				},
				{
					text: 'Quito',
					value: 'Quito'
				}
			],
			onFilter: (value, record) =>
				record?.fromName?.indexOf(value as string) === 0,
			render: (value: string) => value ?? '--',
			width: 120
		},
		{
			title: 'DESTINO',
			dataIndex: 'toName',
			key: 'toName',
			filters: [
				{
					text: 'Fabrica Cascajal',
					value: 'Fabrica Cascajal'
				},
				{
					text: 'Barranquilla',
					value: 'Barranquilla'
				},
				{
					text: 'Cartagena',
					value: 'Cartagena'
				},
				{
					text: 'Quito',
					value: 'Quito'
				}
			],
			onFilter: (value, record) =>
				record?.toName?.indexOf(value as string) === 0,
			render: (value: string) => value ?? '--',
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

	const cashMovementsColumns: TableColumnsType<CashMovement> = [
		{
			title: 'TIPO',
			dataIndex: 'type',
			key: 'type',
			filters: [
				{ text: 'INGRESO', value: 'INCOME' },
				{ text: 'EGRESO', value: 'EXPENSE' }
			],
			onFilter: (value, record) => record.type.indexOf(value as string) === 0,
			render: value => {
				return (
					<span className='flex items-center justify-center'>
						<DollarCircleOutlined
							style={{ color: value === 'INCOME' ? '#10b981' : '#E53535' }}
						/>
					</span>
				);
			},
			width: 80,
			align: 'center'
		},
		{
			title: 'CATEGORÍA',
			dataIndex: 'category',
			key: 'category',
			filters: CASH_MOVEMENT_CAT_FILTER,
			onFilter: (value, record) =>
				record.category.indexOf(value as string) === 0,
			render: (value, record) => {
				return (
					<span className='flex items-center'>
						<Tag color='blue'>{CASH_MOVEMENT_CAT_MAP[value]}</Tag>
						{record?.comments && (
							<Tooltip title={record?.comments}>
								<span>
									<IoInformationCircleOutline size={18} />
								</span>
							</Tooltip>
						)}
					</span>
				);
			},
			width: 160
		},
		{
			title: 'MONTO',
			dataIndex: 'amount',
			key: 'amount',
			render: (value: number, record) => (
				<span
					className={`${record.type === 'INCOME' ? 'text-[#10b981]' : 'text-[#E53535]'}`}
				>
					{formatCurrency(value) ?? '--'}
				</span>
			),
			width: 120
		},
		{
			title: 'CLIENTE',
			dataIndex: 'customerName',
			key: 'customerName',
			...getColumnSearchProps('customerName'),
			render: (value: string) => (value ? <CopyableText text={value} /> : '--'),
			width: 160
		},
		{
			title: 'REFERENCIA',
			dataIndex: 'reference',
			key: 'reference',
			...getColumnSearchProps('reference'),
			render: (value: string) => (value ? <CopyableText text={value} /> : '--'),
			width: 160
		}
	];

	const bankTransferMovementsColumns: TableColumnsType<BankTransferMovement> = [
		{
			title: 'TIPO',
			dataIndex: 'type',
			key: 'type',
			filters: [
				{ text: 'INGRESO', value: 'INCOME' },
				{ text: 'EGRESO', value: 'EXPENSE' }
			],
			onFilter: (value, record) => record.type.indexOf(value as string) === 0,
			render: value => {
				return (
					<span className='flex items-center justify-center'>
						<DollarCircleOutlined
							style={{ color: value === 'INCOME' ? '#10b981' : '#E53535' }}
						/>
					</span>
				);
			},
			width: 80,
			align: 'center'
		},
		{
			title: 'MONTO',
			dataIndex: 'amount',
			key: 'amount',
			render: (value: number, record) => (
				<span
					className={`${record.type === 'INCOME' ? 'text-[#10b981]' : 'text-[#E53535]'}`}
				>
					{formatCurrency(value) ?? '--'}
				</span>
			),
			width: 120
		},
		{
			title: 'CLIENTE',
			dataIndex: 'customerName',
			key: 'customerName',
			...getColumnSearchProps('customerName'),
			render: (value: string) => (value ? <CopyableText text={value} /> : '--'),
			width: 160
		},
		{
			title: 'REFERENCIA',
			dataIndex: 'reference',
			key: 'reference',
			...getColumnSearchProps('reference'),
			render: (value: string) => (value ? <CopyableText text={value} /> : '--'),
			width: 160
		},
		{
			title: 'MÉTODO DE PAGO',
			dataIndex: 'paymentMethod',
			key: 'paymentMethod',
			filters: !params?.shopSlug?.includes('quito')
				? COL_PAYMENT_METHOD_FILTER.filter(
						pm => pm.value !== PaymentMethod.CASH
					)
				: ECU_PAYMENT_METHOD_FILTER.filter(
						pm => pm.value !== PaymentMethod.CASH
					),
			onFilter: (value, record) =>
				record.paymentMethod.indexOf(value as string) === 0,
			render: (value: string) => (
				<Tag color='blue'>{PAYMENT_METHOD_MAP[value] ?? '--'}</Tag>
			),
			width: 200
		},
		{
			title: 'OBSERVACIONES',
			dataIndex: 'comments',
			key: 'comments',
			render: (value: string) => value ?? '--'
		}
	];

	return {
		transactionsColumns,
		cashMovementsColumns,
		bankTransferMovementsColumns
	};
};

export default useTableColumns;
