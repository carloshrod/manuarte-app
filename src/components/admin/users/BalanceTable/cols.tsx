import useTable from '@/hooks/useTable';
import {
	COL_PAYMENT_METHOD_FILTER,
	ECU_PAYMENT_METHOD_FILTER
} from '@/hooks/utils';
import { formatCurrency, formatDate } from '@/utils/formats';
import {
	BALANCE_MOVEMENT_CATEGORY_MAP,
	PAYMENT_METHOD_MAP
} from '@/utils/mappings';
import { TableColumnsType, Tag } from 'antd';

const BalanceCols = ({ currency }: { currency: string }) => {
	const { getColumnDateFilterProps } = useTable();

	const balanceMovementColumns: TableColumnsType<CustomerBalanceMovement> = [
		{
			title: 'TIPO',
			dataIndex: 'type',
			key: 'type',
			filters: [
				{
					text: 'Crédito',
					value: 'CREDIT'
				},
				{
					text: 'Débito',
					value: 'DEBIT'
				}
			],
			onFilter: (value, record) => record.type.indexOf(value as string) === 0,
			render: value => (
				<Tag color={value === 'CREDIT' ? '#10b981' : '#E53535'}>
					{value === 'CREDIT' ? 'CRÉDITO' : 'DÉBITO'}
				</Tag>
			),
			width: 100
		},
		{
			title: 'CATEGORÍA',
			dataIndex: 'category',
			key: 'category',
			filters: [
				{
					text: 'Abono',
					value: 'ADVANCE_PAYMENT'
				},
				{
					text: 'Reembolso',
					value: 'REFUND'
				},
				{
					text: 'Pago aplicado',
					value: 'PAYMENT_APPLIED'
				},
				{
					text: 'Ajuste',
					value: 'ADJUSTMENT'
				},
				{
					text: 'Otro',
					value: 'OTHER'
				}
			],
			onFilter: (value, record) =>
				record.category.indexOf(value as string) === 0,
			render: value => (
				<Tag color='blue'>{BALANCE_MOVEMENT_CATEGORY_MAP[value]}</Tag>
			),
			width: 100
		},
		{
			title: 'MÉTODO DE PAGO',
			dataIndex: 'paymentMethod',
			key: 'paymentMethod',
			filters:
				currency === 'COP'
					? COL_PAYMENT_METHOD_FILTER
					: ECU_PAYMENT_METHOD_FILTER,
			onFilter: (value, record) =>
				record.paymentMethod?.indexOf(value as string) === 0,
			render: value =>
				value ? <Tag color='blue'>{PAYMENT_METHOD_MAP[value]}</Tag> : '--',
			width: 100
		},
		{
			title: 'MONTO',
			dataIndex: 'amount',
			key: 'amount',
			render: (value, record: CustomerBalanceMovement) => (
				<span
					className={`${record.type === 'DEBIT' ? 'text-red-500' : 'text-green-500'}`}
				>
					{formatCurrency(value)}
				</span>
			),
			width: 100
		},
		{
			title: 'BALANCE ANTERIOR',
			dataIndex: 'balanceBefore',
			key: 'balanceBefore',
			render: value => <span>{formatCurrency(value)}</span>,
			width: 100
		},
		{
			title: 'BALANCE',
			dataIndex: 'balanceAfter',
			key: 'balanceAfter',
			render: value => <span>{formatCurrency(value)}</span>,
			width: 100
		},
		{
			title: 'FECHA',
			dataIndex: 'createdDate',
			key: 'createdDate',
			...getColumnDateFilterProps('createdDate'),
			render: value => <span>{formatDate(value)}</span>,
			width: 120
		}
	];

	return { balanceMovementColumns };
};

export default BalanceCols;
