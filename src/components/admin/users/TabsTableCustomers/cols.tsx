import useTable from '@/hooks/useTable';
import { TableColumnsType } from 'antd';
import CopyableText from '../../common/ui/CopyableText';
import CustomersActions from '../CustomersActions';
import { formatCurrency } from '@/utils/formats';
import { FilterValue } from 'antd/es/table/interface';

const CustomerCols = ({
	isAdmin = false,
	tableFilters
}: {
	isAdmin?: boolean;
	tableFilters?: Record<string, FilterValue | null>;
}) => {
	const { getColumnSearchProps } = useTable();

	const customerColumns: TableColumnsType<Customer> = [
		{
			title: 'DOCUMENTO',
			dataIndex: 'dni',
			key: 'dni',
			filteredValue: tableFilters?.dni || null,
			...getColumnSearchProps('dni'),
			render: value => <CopyableText text={value} />,
			width: 120
		},
		{
			title: 'NOMBRE',
			dataIndex: 'fullName',
			key: 'fullName',
			filteredValue: tableFilters?.fullName || null,
			...getColumnSearchProps('fullName'),
			width: 150
		},
		{
			title: 'EMAIL',
			dataIndex: 'email',
			key: 'email',
			filteredValue: tableFilters?.email || null,
			...getColumnSearchProps('email'),
			render: value => (value ? <CopyableText text={value} /> : '--'),
			width: 140
		},
		{
			title: 'TELÉFONO',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
			filteredValue: tableFilters?.phoneNumber || null,
			...getColumnSearchProps('phoneNumber'),
			render: value => (value ? <CopyableText text={value} /> : '--'),
			width: 100
		},
		{
			title: 'CIUDAD',
			dataIndex: 'cityName',
			key: 'cityName',
			filteredValue: tableFilters?.cityName || null,
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
			title: 'DOCUMENTO',
			dataIndex: 'dni',
			key: 'dni',
			filteredValue: tableFilters?.dni || null,
			...getColumnSearchProps('dni'),
			render: value => <CopyableText text={value} />,
			width: 100
		},
		{
			title: 'NOMBRE',
			dataIndex: 'fullName',
			key: 'fullName',
			filteredValue: tableFilters?.fullName || null,
			...getColumnSearchProps('fullName'),
			width: 150
		},
		{
			title: 'CIUDAD',
			dataIndex: 'cityName',
			key: 'cityName',
			filteredValue: tableFilters?.cityName || null,
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

	return { customerColumns, topCustomerColumns, topProductsCustomerColumns };
};

export default CustomerCols;
