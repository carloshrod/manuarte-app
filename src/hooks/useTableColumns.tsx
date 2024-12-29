import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, QRCode, Space, TableColumnsType } from 'antd';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import moment from 'moment';
import ActionsProduct from '@/components/admin/products/ActionsProduct';
import ActionsProductCategory from '@/components/admin/products/ActionsProductCategory';
import StaffActions from '@/components/admin/users/StaffActions';
import CustomersActions from '@/components/admin/users/CustomersActions';
import useTable from './useTable';
import { formatToTitleCase, STATUS_MAP } from '@/utils/utils';

const useTableColumns = () => {
	const { getColumnSearchProps } = useTable();
	const pathname = usePathname();

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
			...getColumnSearchProps('serialNumber')
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
			render: value => STATUS_MAP[value]
		},
		{
			title: 'CLIENTE',
			dataIndex: 'customerName',
			key: 'customerName',
			...getColumnSearchProps('customerName'),
			render: (value: string) =>
				value ? formatToTitleCase(value) : 'Consumidor final'
		},
		{
			title: 'FECHA DE VENCIMIENTO',
			dataIndex: 'dueDate',
			key: 'dueDate',
			sorter: (a: Quote, b: Quote) =>
				moment(a?.dueDate).valueOf() - moment(b?.dueDate).valueOf(),
			sortDirections: ['descend', 'ascend'],
			render: (value: string) => (
				<span>
					{value ? moment(value).startOf('day').format('YYYY/MM/DD') : '--'}
				</span>
			)
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
									icon={<BsFileEarmarkPdf size={24} />}
								/>
							</Link>
						) : (
							'--'
						)}
					</span>
				);
			},
			width: 70
		}
		// {
		// 	title: 'ACCIONES',
		// 	key: 'actions',
		// 	className: 'actions',
		// 	render: (_, record: Quote) => <CustomersActions record={record} />,
		// 	width: 100
		// }
	];

	return {
		productColumns,
		productCategoryColumns,
		staffColumns,
		customerColumns,
		quoteColumns
	};
};

export default useTableColumns;
