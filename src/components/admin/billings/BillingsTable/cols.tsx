import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button, TableColumnsType, Tag } from 'antd';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import CopyableText from '../../common/ui/CopyableText';
import BillingsActions from '../BillingsActions';
import useTable from '@/hooks/useTable';
import { formatDate, formatToTitleCase } from '@/utils/formats';
import {
	COL_PAYMENT_METHOD_FILTER,
	ECU_PAYMENT_METHOD_FILTER
} from '../../consts';
import { BILLING_STATUS_MAP, PAYMENT_METHOD_MAP } from '@/utils/mappings';
import { FilterValue } from 'antd/es/table/interface';
import { Dayjs } from 'dayjs';

type Props = {
	tableFilters: Record<string, FilterValue | null>;
	shopSlug: string;
};

const BillingCols = ({ tableFilters, shopSlug }: Props) => {
	const { getColumnSearchProps, getColumnDateFilterProps } = useTable();
	const pathname = usePathname();

	const billingColumns: TableColumnsType<Billing> = [
		{
			title: 'SERIAL',
			dataIndex: 'serialNumber',
			key: 'serialNumber',
			filteredValue: tableFilters.serialNumber || null,
			...getColumnSearchProps('serialNumber'),
			render: value => <CopyableText text={value} />,
			width: 160
		},
		{
			title: 'ESTADO',
			dataIndex: 'status',
			key: 'status',
			filteredValue: tableFilters.status || null,
			filters: [
				{
					text: 'FACTURADA',
					value: 'PAID'
				},
				{
					text: 'ENTREGA PENDIENTE',
					value: 'PENDING_DELIVERY'
				},

				{
					text: 'PAGO PARCIAL',
					value: 'PARTIAL_PAYMENT'
				},
				{
					text: 'PAGO PENDIENTE',
					value: 'PENDING_PAYMENT'
				},
				{
					text: 'ANULADA',
					value: 'CANCELED'
				}
			],
			render: value => {
				const STATUS_COLORS: Record<string, string> = {
					PAID: 'success',
					PENDING_DELIVERY: 'cyan',
					PENDING_PAYMENT: 'orange',
					PARTIAL_PAYMENT: 'yellow',
					CANCELED: 'red'
				};

				return (
					<Tag color={STATUS_COLORS[value]}>{BILLING_STATUS_MAP[value]}</Tag>
				);
			},
			width: 120
		},
		{
			title: 'MÉTODOS DE PAGO',
			dataIndex: 'paymentMethods',
			key: 'paymentMethods',
			filteredValue: tableFilters.paymentMethods || null,
			filters: !shopSlug?.includes('quito')
				? COL_PAYMENT_METHOD_FILTER
				: ECU_PAYMENT_METHOD_FILTER,
			render: value =>
				value.map((p: string) => (
					<Tag color='blue' key={p} style={{ marginBottom: 2 }}>
						{PAYMENT_METHOD_MAP[p]}
					</Tag>
				)),
			width: 175
		},
		{
			title: 'CLIENTE',
			dataIndex: 'customerName',
			key: 'customerName',
			filteredValue: tableFilters.customerName || null,
			...getColumnSearchProps('customerName'),
			render: (value: string = 'Consumidor final') =>
				value ? formatToTitleCase(value) : 'Consumidor final',
			width: 260
		},
		{
			title: 'FECHA',
			dataIndex: 'effectiveDate',
			key: 'effectiveDate',
			filteredValue: tableFilters.effectiveDate || null,
			...getColumnDateFilterProps(
				'effectiveDate',
				false,
				tableFilters.effectiveDate as [Dayjs | null, Dayjs | null] | null
			),
			render: (value: string, record) => {
				const valueDate = value || record?.createdDate;

				return <span>{valueDate ? formatDate(valueDate) : '--'}</span>;
			},
			width: 140
		},
		{
			title: 'PDF',
			dataIndex: 'id',
			key: 'id',
			render: (value: string, record: Billing) => {
				return (
					<span>
						{value ? (
							<Link href={`${pathname}/${record.serialNumber}`}>
								<Button
									variant='filled'
									color='danger'
									icon={
										<BsFileEarmarkPdf
											size={24}
											style={{ display: 'flex', alignItems: 'center' }}
										/>
									}
								/>
							</Link>
						) : (
							'--'
						)}
					</span>
				);
			},
			width: 100
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record: Billing) => <BillingsActions record={record} />,
			width: 100
		}
	];

	return { billingColumns };
};

export default BillingCols;
