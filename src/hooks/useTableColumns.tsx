import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import {
	Badge,
	Button,
	QRCode,
	Space,
	TableColumnsType,
	Tag,
	Tooltip
} from 'antd';
import { CheckCircleOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import { TiArrowDown, TiArrowUp } from 'react-icons/ti';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { useSession } from 'next-auth/react';
import ProductActions from '@/components/admin/products/ProductActions';
import ProductCategoryActions from '@/components/admin/products/ProductCategoryActions';
import StaffActions from '@/components/admin/users/StaffActions';
import CustomersActions from '@/components/admin/users/CustomersActions';
import QuotesActions from '@/components/admin/quotes/QuotesActions';
import BillingsActions from '@/components/admin/billings/BillingsActions';
import StockItemActions from '@/components/admin/stock/StockItemActions';
import StockItemsHistoryActions from '@/components/admin/stock/StockItemHistoryActions';
import TransactionActions from '@/components/admin/transactions/TransactionAction';
import useTable from './useTable';
import { formatCurrency, formatDate, formatToTitleCase } from '@/utils/formats';
import {
	BILLING_STATUS_MAP,
	CASH_MOVEMENT_CAT_MAP,
	PAYMENT_METHOD_MAP,
	QUOTE_STATUS_MAP,
	TRANSACTION_STATES_MAP,
	TRANSACTION_TYPES_MAP
} from '@/utils/mappings';
import {
	getStockStatusColor,
	COL_PAYMENT_METHOD_FILTER,
	ECU_PAYMENT_METHOD_FILTER,
	TAG_COLORS,
	CASH_MOVEMENT_CAT_FILTER
} from './utils';
import { PaymentMethod } from '@/types/enums';

const useTableColumns = () => {
	const { getColumnSearchProps, getColumnDateFilterProps } = useTable();
	const pathname = usePathname();
	const params = useParams();
	const { data: session } = useSession();
	const isAdmin = session?.user?.roleName === 'admin';

	const productColumns: TableColumnsType<ProductVariant> = [
		{
			title: '#',
			dataIndex: 'vId',
			key: 'vId',
			...getColumnSearchProps('vId'),
			width: 105
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
			title: 'GRUPO',
			dataIndex: 'groupName',
			key: 'groupName',
			...getColumnSearchProps('groupName'),
			render: (value: string) => value ?? '--',
			width: 150
		},
		{
			title: 'FECHA DE CREACIÓN',
			dataIndex: 'createdDate',
			key: 'createdDate',
			render: (value: string) => (
				<span>{value ? formatDate(value) : '--'}</span>
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
			render: value => value || '--',
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
			dataIndex: 'cityName',
			key: 'cityName',
			...getColumnSearchProps('cityName'),
			render: (value, record) => (value || record?.city) ?? '--',
			width: 100
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record: Customer) => (
				<CustomersActions record={record} isAdmin={isAdmin} />
			),
			width: 100,
			align: 'center'
		}
	];

	const topCustomerColumns: TableColumnsType<TopCustomer> = [
		{
			title: '#',
			key: 'index',
			width: 30,
			render: (_: any, __: TopCustomer, index: number) => index + 1,
			align: 'center'
		},
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
			title: 'CIUDAD',
			dataIndex: 'cityName',
			key: 'cityName',
			...getColumnSearchProps('cityName'),
			render: (value, record) => (value || record?.city) ?? '--',
			width: 100
		},
		{
			title: 'COMPRAS',
			dataIndex: 'billingCount',
			key: 'billingCount',
			sorter: (a, b) => a.billingCount - b.billingCount,
			defaultSortOrder: 'descend',
			sortDirections: ['descend', 'ascend', 'descend'],
			width: 80,
			align: 'center'
		},
		{
			title: 'FACTURADO',
			dataIndex: 'totalSpent',
			key: 'totalSpent',
			render: value => formatCurrency(value) ?? '--',
			sorter: (a, b) => a.totalSpent - b.totalSpent,
			sortDirections: ['descend', 'ascend', 'descend'],
			width: 100,
			align: 'center'
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record: Customer) => (
				<CustomersActions record={record} isTop={true} isAdmin={isAdmin} />
			),
			width: 80,
			align: 'center'
		}
	];

	const topProductsCustomerColumns: TableColumnsType<TopProductCustomer> = [
		{
			title: '#',
			key: 'index',
			render: (_: any, __: TopProductCustomer, index: number) => index + 1,
			align: 'center'
		},
		{
			title: 'PRODUCTO',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'CANTIDAD TOTAL',
			dataIndex: 'totalQty',
			key: 'totalQty',
			align: 'center'
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
			dataIndex: 'createdDate',
			key: 'createdDate',
			...getColumnDateFilterProps('createdDate'),
			render: (value: string) => (
				<span>{value ? formatDate(value) : '--'}</span>
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
			render: (_, record: Quote) => (
				<QuotesActions record={record} shopSlug={params?.shopSlug as string} />
			),
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
			onFilter: (value, record) => record.status.indexOf(value as string) === 0,
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
			filters: !params?.shopSlug?.includes('quito')
				? COL_PAYMENT_METHOD_FILTER
				: ECU_PAYMENT_METHOD_FILTER,
			onFilter: (value, record) =>
				record.paymentMethods.includes(value as string),
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
			...getColumnSearchProps('customerName'),
			render: (value: string = 'Consumidor final') =>
				value ? formatToTitleCase(value) : 'Consumidor final',
			width: 260
		},
		{
			title: 'FECHA',
			dataIndex: 'effectiveDate',
			key: 'effectiveDate',
			...getColumnDateFilterProps('effectiveDate'),
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
			render: (value, record) => {
				const statusColor = getStockStatusColor({
					quantity: value,
					maxQty: record.maxQty,
					minQty: record.minQty
				});

				return <span className={`${statusColor} font-semibold`}>{value}</span>;
			},
			width: 110,
			align: 'center'
		},
		...(isAdmin
			? [
					{
						title: 'COSTO',
						dataIndex: 'cost',
						key: 'cost',
						render: (value: string) => formatCurrency(value) ?? '--',
						width: 100,
						align: 'center' as const
					},
					{
						title: 'COSTO TOTAL',
						dataIndex: 'totalCost',
						key: 'totalCost',
						render: (value: string, record: StockItem) => {
							if (!value || !record.quantity) return '$0';

							const totalCost = Number(value) * Number(record.quantity);

							return formatCurrency(totalCost);
						},
						width: 100,
						align: 'center' as const
					},
					{
						title: 'CANT. MIN',
						dataIndex: 'minQty',
						key: 'minQty',
						width: 70,
						align: 'center' as const
					},
					{
						title: 'CANT. MAX',
						dataIndex: 'maxQty',
						key: 'maxQty',
						width: 70,
						align: 'center' as const
					}
				]
			: []),
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_: any, record: StockItem) => (
				<StockItemActions record={record} isAdmin={isAdmin} />
			),
			width: 100,
			align: 'center'
		}
	];

	const stockItemsHistoryColumns: TableColumnsType<StockItemHistory> = [
		{
			title: 'FECHA',
			dataIndex: 'createdDate',
			key: 'createdDate',
			...getColumnDateFilterProps('createdDate', true),
			render: (value: string) => (
				<span>{value ? formatDate(value) : '--'}</span>
			),
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
				},
				{
					text: 'Factura',
					value: 'BILLING'
				}
			],
			onFilter: (value, record) => record.type.indexOf(value as string) === 0,
			render: (value, record) => {
				const toolTipTitle = `De ${record.fromName} a ${record.toName} `;

				return (
					<span className='flex items-center'>
						<Tag color={TAG_COLORS[value]}>
							{value === 'BILLING' ? 'Factura' : TRANSACTION_TYPES_MAP[value]}
						</Tag>
						{record?.fromName && record?.toName ? (
							<Tooltip title={toolTipTitle}>
								<span>
									<IoInformationCircleOutline size={18} />
								</span>
							</Tooltip>
						) : null}
					</span>
				);
			},
			width: 100
		},
		{
			title: 'IDENTIFICADOR',
			dataIndex: 'identifier',
			key: 'identifier',
			...getColumnSearchProps('identifier'),
			render: value => formatToTitleCase(value) ?? '--',
			width: 140
		},
		{
			title: 'STOCK ANTES',
			dataIndex: 'stockBefore',
			key: 'stockBefore',
			render: (value: string) => value ?? '--',
			width: 80,
			align: 'center'
		},
		{
			title: 'CANTIDAD',
			dataIndex: 'quantity',
			key: 'quantity',
			render: (value: string) => value ?? '--',
			width: 80,
			align: 'center'
		},
		{
			title: 'STOCK DESPUÉS',
			dataIndex: 'stockAfter',
			key: 'stockAfter',
			render: (_, record) => {
				const stockAfter =
					record.type === 'ENTER'
						? Number(record.stockBefore) + Number(record.quantity)
						: Number(record.stockBefore) - Number(record.quantity);

				const arrow =
					record.type === 'ENTER' ? (
						<TiArrowUp size={20} color='#10b981' />
					) : (
						<TiArrowDown size={20} color='#E53535' />
					);

				return (
					<span className='flex justify-center items-center'>
						{stockAfter ?? '--'}
						{arrow}
					</span>
				);
			},
			width: 80,
			align: 'center'
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_: any, record: StockItemHistory) => (
				<StockItemsHistoryActions record={record} />
			),
			width: 60,
			align: 'center'
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
			width: 140
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
			title: 'REFERENCIA',
			dataIndex: 'reference',
			key: 'reference',
			...getColumnSearchProps('reference'),
			render: (value: string) => value ?? '--'
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
			)
		},
		{
			title: 'REFERENCIA',
			dataIndex: 'reference',
			key: 'reference',
			...getColumnSearchProps('reference'),
			render: (value: string) => value ?? '--'
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
			)
		},
		{
			title: 'OBSERVACIONES',
			dataIndex: 'comments',
			key: 'comments',
			render: (value: string) => value ?? '--'
		}
	];

	return {
		productColumns,
		productCategoryColumns,
		staffColumns,
		customerColumns,
		topCustomerColumns,
		topProductsCustomerColumns,
		quoteColumns,
		billingColumns,
		stockItemsColumns,
		stockItemsHistoryColumns,
		transactionsColumns,
		cashMovementsColumns,
		bankTransferMovementsColumns
	};
};

export default useTableColumns;
