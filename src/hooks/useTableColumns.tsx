import { useParams } from 'next/navigation';
import { TableColumnsType, Tag, Tooltip } from 'antd';
import { DollarCircleOutlined } from '@ant-design/icons';
import { IoInformationCircleOutline } from 'react-icons/io5';
import useTable from './useTable';
import { formatCurrency } from '@/utils/formats';
import { CASH_MOVEMENT_CAT_MAP, PAYMENT_METHOD_MAP } from '@/utils/mappings';
import {
	COL_PAYMENT_METHOD_FILTER,
	ECU_PAYMENT_METHOD_FILTER,
	CASH_MOVEMENT_CAT_FILTER
} from './utils';
import { PaymentMethod } from '@/types/enums';
import CopyableText from '@/components/admin/common/ui/CopyableText';

const useTableColumns = () => {
	const { getColumnSearchProps } = useTable();
	const params = useParams();

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
		cashMovementsColumns,
		bankTransferMovementsColumns
	};
};

export default useTableColumns;
