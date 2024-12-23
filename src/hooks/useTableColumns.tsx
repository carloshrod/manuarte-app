import { QRCode, Space, TableColumnsType } from 'antd';
import useTable from './useTable';
import moment from 'moment';
import ActionsProduct from '@/components/admin/products/ActionsProduct';
import ActionsProductCategory from '@/components/admin/products/ActionsProductCategory';
import StaffActions from '@/components/admin/users/StaffActions';
import CustomersActions from '@/components/admin/users/CustomersActions';
import { formatRoleName } from '@/utils/utils';

const useTableColumns = () => {
	const { getColumnSearchProps } = useTable();

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
			render: (_, record: ProductVariant) => <ActionsProduct record={record} />,
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
			sorter: (a: DataTable, b: DataTable) =>
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
				<ActionsProductCategory record={record} />
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
			render: (value: string) => formatRoleName(value),
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

	return {
		productColumns,
		productCategoryColumns,
		staffColumns,
		customerColumns
	};
};

export default useTableColumns;
