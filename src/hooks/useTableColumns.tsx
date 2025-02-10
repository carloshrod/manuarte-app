import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Button, QRCode, Space, TableColumnsType } from 'antd';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import moment from 'moment';
import ProductActions from '@/components/admin/products/ProductActions';
import ProductCategoryActions from '@/components/admin/products/ProductCategoryActions';
import StaffActions from '@/components/admin/users/StaffActions';
import CustomersActions from '@/components/admin/users/CustomersActions';
import useTable from './useTable';
import { formatCurrency, formatToTitleCase } from '@/utils/formats';
import {
	BILLING_STATUS_MAP,
	PAYMENT_METHOD_MAP,
	QUOTE_STATUS_MAP
} from '@/utils/mappings';
import QuotesActions from '@/components/admin/quotes/QuotesActions';
import BillingsActions from '@/components/admin/billings/BillingsActions';
import { COL_PAYMENT_METHOD_FILTER, ECU_PAYMENT_METHOD_FILTER } from './utils';
import StockItemActions from '@/components/admin/stock/StockItemActions';

const useTableColumns = () => {
	const { getColumnSearchProps } = useTable();
	const pathname = usePathname();
	const params = useParams();

	const productColumns: TableColumnsType<ProductVariant> = [
		{
			title: '#',
			dataIndex: 'vId',
			key: 'vId',
			...getColumnSearchProps('vId'),
			width: 100
		},
		{
			title: 'NOMBRE',
			dataIndex: 'productName',
			key: 'productName',
			...getColumnSearchProps('productName'),
			width: 150
		},
		{
			title: 'PRESENTACIÓN',
			dataIndex: 'name',
			key: 'name',
			...getColumnSearchProps('name'),
			render: value => formatToTitleCase(value),
			width: 120
		},
		{
			title: 'DESCRIPCIÓN',
			dataIndex: 'productDescription',
			key: 'productDescription',
			...getColumnSearchProps('productDescription'),
			width: 150
		},

		{
			title: 'CATEGORÍA',
			dataIndex: 'productCategoryName',
			key: 'productCategoryName',
			...getColumnSearchProps('productCategoryName'),
			width: 150
		},
		{
			title: 'CÓDIGO QR',
			dataIndex: 'vId',
			key: 'vId',
			render: (value: string) => {
				return (
					<Space align='center'>
						<QRCode value={value || 'NO vID'} size={80} />
					</Space>
				);
			},
			width: 100
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record: ProductVariant) => <ProductActions record={record} />,
			width: 100
		}
	];

	const productCategoryColumns: TableColumnsType<ProductCategory> = [
		{
			title: '#',
			dataIndex: 'cId',
			key: 'cId',
			...getColumnSearchProps('cId'),
			width: 50
		},
		{
			title: 'NOMBRE',
			dataIndex: 'name',
			key: 'name',
			...getColumnSearchProps('name'),
			width: 200
		},
		{
			title: 'FECHA DE CREACIÓN',
			dataIndex: 'createdDate',
			key: 'createdDate',
			sorter: (a: ProductCategory, b: ProductCategory) =>
				moment(a?.createdDate).valueOf() - moment(b?.createdDate).valueOf(),
			sortDirections: ['descend', 'ascend'],
			render: (value: string) => (
				<span>
					{value ? moment(value).startOf('day').format('YYYY/MM/DD') : '--'}
				</span>
			),
			width: 150
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record: ProductCategory) => (
				<ProductCategoryActions record={record} />
			),
			width: 100
		}
	];

	const staffColumns: TableColumnsType<Staff> = [
		{
			title: 'DOCUMENTO',
			dataIndex: 'dni',
			key: 'dni',
			...getColumnSearchProps('dni'),
			width: 100
		},
		{
			title: 'NOMBRE',
			dataIndex: 'fullName',
			key: 'fullName',
			...getColumnSearchProps('fullName'),
			width: 120
		},
		{
			title: 'EMAIL',
			dataIndex: 'email',
			key: 'email',
			...getColumnSearchProps('email'),
			width: 140
		},
		{
			title: 'ROL',
			dataIndex: 'roleName',
			key: 'roleName',
			filters: [
				{
					text: 'Administrador',
					value: 'admin'
				},
				{
					text: 'Cajero',
					value: 'cajero'
				},
				{
					text: 'Bodeguero',
					value: 'bodeguero'
				}
			],
			onFilter: (value, record) =>
				record.roleName.indexOf(value as string) === 0,
			render: (value: string) => formatToTitleCase(value),
			width: 100
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record: Staff) => <StaffActions record={record} />,
			width: 100
		}
	];

	const customerColumns: TableColumnsType<Customer> = [
		{
			title: 'DOCUMENTO',
			dataIndex: 'dni',
			key: 'dni',
			...getColumnSearchProps('dni'),
			width: 100
		},
		{
			title: 'NOMBRE',
			dataIndex: 'fullName',
			key: 'fullName',
			...getColumnSearchProps('fullName'),
			width: 120
		},
		{
			title: 'EMAIL',
			dataIndex: 'email',
			key: 'email',
			...getColumnSearchProps('email'),
			width: 140
		},
		{
			title: 'TELÉFONO',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
			...getColumnSearchProps('phoneNumber'),
			width: 100
		},
		{
			title: 'CIUDAD',
			dataIndex: 'city',
			key: 'city',
			...getColumnSearchProps('city'),
			width: 100,
			render: value => <p>{value ?? '--'}</p>
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record: Customer) => <CustomersActions record={record} />,
			width: 100
		}
	];

	const quoteColumns: TableColumnsType<Quote> = [
		{
			title: 'SERIAL',
			dataIndex: 'serialNumber',
			key: 'serialNumber',
			...getColumnSearchProps('serialNumber'),
			width: 180
		},
		{
			title: 'ESTADO',
			dataIndex: 'status',
			key: 'status',
			filters: [
				{
					text: 'POR PAGAR',
					value: 'PENDING'
				},
				{
					text: 'ACEPTADA',
					value: 'ACCEPTED'
				},
				{
					text: 'CANCELADA',
					value: 'CANCELED'
				},
				{
					text: 'EN REVISIÓN',
					value: 'REVISION'
				},
				{
					text: 'VENCIDA',
					value: 'OVERDUE'
				}
			],
			onFilter: (value, record) => record.status.indexOf(value as string) === 0,
			render: value => QUOTE_STATUS_MAP[value],
			width: 140
		},
		{
			title: 'CLIENTE',
			dataIndex: 'customerName',
			key: 'customerName',
			...getColumnSearchProps('customerName'),
			render: (value: string = 'Consumidor final') =>
				value ? formatToTitleCase(value) : 'Consumidor final',
			width: 300
		},
		{
			title: 'FECHA',
			dataIndex: 'updatedDate',
			key: 'updatedDate',
			sorter: (a: Quote, b: Quote) =>
				moment(a?.updatedDate).valueOf() - moment(b?.updatedDate).valueOf(),
			sortDirections: ['descend', 'ascend'],
			render: (value: string) => (
				<span>
					{value ? moment(value).startOf('day').format('YYYY/MM/DD') : '--'}
				</span>
			),
			width: 140
		},
		{
			title: 'PDF',
			dataIndex: 'id',
			key: 'id',
			render: (value: string, record: Quote) => {
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
			render: (_, record: Quote) => <QuotesActions record={record} />,
			width: 140
		}
	];

	const billingColumns: TableColumnsType<Billing> = [
		{
			title: 'SERIAL',
			dataIndex: 'serialNumber',
			key: 'serialNumber',
			...getColumnSearchProps('serialNumber'),
			width: 160
		},
		{
			title: 'ESTADO',
			dataIndex: 'status',
			key: 'status',
			filters: [
				{
					text: 'PAGADA',
					value: 'PAID'
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
			onFilter: (value, record) => record.status.indexOf(value as string) === 0,
			render: value => BILLING_STATUS_MAP[value],
			width: 120
		},
		{
			title: 'MÉTODO DE PAGO',
			dataIndex: 'paymentMethod',
			key: 'paymentMethod',
			filters: !params?.shopSlug?.includes('quito')
				? COL_PAYMENT_METHOD_FILTER
				: ECU_PAYMENT_METHOD_FILTER,
			onFilter: (value, record) =>
				record.paymentMethod.indexOf(value as string) === 0,
			render: value => PAYMENT_METHOD_MAP[value],
			width: 170
		},
		{
			title: 'CLIENTE',
			dataIndex: 'customerName',
			key: 'customerName',
			...getColumnSearchProps('customerName'),
			render: (value: string = 'Consumidor final') =>
				value ? formatToTitleCase(value) : 'Consumidor final',
			width: 260
		},
		{
			title: 'FECHA DE ACTUALIZACIÓN',
			dataIndex: 'updatedDate',
			key: 'updatedDate',
			sorter: (a: Billing, b: Billing) =>
				moment(a?.updatedDate).valueOf() - moment(b?.updatedDate).valueOf(),
			sortDirections: ['descend', 'ascend'],
			render: (value: string) => (
				<span>
					{value ? moment(value).startOf('day').format('YYYY/MM/DD') : '--'}
				</span>
			),
			width: 230
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

	const stockItemsColumns: TableColumnsType<StockItem> = [
		{
			title: 'PRODUCTO',
			dataIndex: 'productName',
			key: 'productName',
			...getColumnSearchProps('productName'),
			render: value => formatToTitleCase(value),
			width: 250
		},
		{
			title: 'PRESENTACIÓN',
			dataIndex: 'productVariantName',
			key: 'productVariantName',
			...getColumnSearchProps('productVariantName'),
			render: value => formatToTitleCase(value),
			width: 140
		},
		{
			title: 'MONEDA',
			dataIndex: 'currency',
			key: 'currency',
			width: 100
		},
		{
			title: 'PRECIO',
			dataIndex: 'price',
			key: 'price',
			render: (value: string) => formatCurrency(value) ?? '--',
			width: 100,
			align: 'center'
		},
		{
			title: 'CANTIDAD',
			dataIndex: 'quantity',
			key: 'quantity',
			width: 110,
			align: 'center'
		},
		{
			title: 'COSTO',
			dataIndex: 'cost',
			key: 'cost',
			render: (value: string) => formatCurrency(value) ?? '--',
			width: 100,
			align: 'center'
		},
		{
			title: 'COSTO TOTAL',
			dataIndex: 'cost',
			key: 'cost',
			render: (value, record) => {
				if (!value || !record.quantity) return '$0';

				const totalCost = Number(value) * Number(record.quantity);

				return formatCurrency(totalCost);
			},
			width: 100,
			align: 'center'
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record: StockItem) => <StockItemActions record={record} />,
			width: 100
		}
	];

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
				const STATES_MAP: Record<string, string> = {
					SUCCESS: 'Realizado',
					PROGRESS: 'En Progreso'
				};

				return STATES_MAP[value];
			},
			width: 100
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
				const TYPES_MAP: Record<string, string> = {
					ENTER: 'Entrada',
					EXIT: 'Salida',
					TRANSFER: 'Transferencia'
				};

				return TYPES_MAP[value];
			},
			width: 100
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
			width: 100
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
			width: 100
		},
		{
			title: 'DESCRIPCIÓN',
			dataIndex: 'description',
			key: 'description',
			render: (value: string) =>
				value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '--',
			width: 250
		},
		{
			title: 'FECHA DE CREACIÓN',
			dataIndex: 'createdDate',
			key: 'createdDate',
			sorter: (a: Transaction, b: Transaction) =>
				moment(a?.createdDate).valueOf() - moment(b?.createdDate).valueOf(),
			sortDirections: ['descend', 'ascend'],
			render: (value: string) => (
				<span>
					{value ? moment(value).startOf('day').format('YYYY/MM/DD') : '--'}
				</span>
			),
			width: 150
		}
		// {
		// 	title: 'ACCIONES',
		// 	key: 'actions',
		// 	className: 'actions',
		// 	render: (_, record: Transaction) => <StockItemActions record={record} />,
		// 	width: 100
		// }
	];

	return {
		productColumns,
		productCategoryColumns,
		staffColumns,
		customerColumns,
		quoteColumns,
		billingColumns,
		stockItemsColumns,
		transactionsColumns
	};
};

export default useTableColumns;
