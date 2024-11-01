import { TableColumnsType } from 'antd';
import useTable from './useTable';
import moment from 'moment';
import Image from 'next/image';
import ActionsProduct from '@/components/admin/products/ActionsProduct';

const useTableColumns = () => {
	const { getColumnSearchProps } = useTable();

	const productColumns: TableColumnsType<Product> = [
		{
			title: '#',
			dataIndex: 'variantProductVId',
			key: 'variantProductVId',
			...getColumnSearchProps('variantProductVId'),
			width: 100
		},
		{
			title: 'NOMBRE',
			dataIndex: 'name',
			key: 'name',
			width: 150,
			...getColumnSearchProps('name')
		},
		{
			title: 'PRESENTACIÓN',
			dataIndex: 'variantProductName',
			key: 'variantProductName',
			width: 100,
			...getColumnSearchProps('variantProductName')
		},
		{
			title: 'DESCRIPCIÓN',
			dataIndex: 'description',
			key: 'description',
			width: 150,
			...getColumnSearchProps('description')
		},

		{
			title: 'CATEGORÍA',
			dataIndex: 'categoryProductName',
			key: 'categoryProductName',
			width: 150,
			...getColumnSearchProps('categoryProductName')
		},
		{
			title: 'CÓDIGO QR',
			dataIndex: 'qrCode',
			key: 'qrCode',
			render: (value: string) => {
				return <Image src={value} width={80} height={80} alt='QR Image' />;
			},
			width: 100
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record: Product) => <ActionsProduct record={record} />,
			width: 100
		}
	];

	const productCategoryColumns: TableColumnsType<ProductCategory> = [
		{
			title: '#',
			dataIndex: 'cId',
			key: 'cId',
			...getColumnSearchProps('cId'),
			width: 100
		},
		{
			title: 'NOMBRE',
			dataIndex: 'name',
			key: 'name',
			width: 150,
			...getColumnSearchProps('name')
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
			width: 100
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record: DataTable) => <ActionsProduct record={record} />,
			width: 100
		}
	];

	const userColumns: TableColumnsType<User> = [
		{
			title: '#',
			dataIndex: 'id',
			key: 'id',
			...getColumnSearchProps('id'),
			width: 100
		},
		{
			title: 'EMAIL',
			dataIndex: 'email',
			key: 'email',
			width: 150,
			...getColumnSearchProps('email')
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
			width: 100
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record: DataTable) => <ActionsProduct record={record} />,
			width: 100
		}
	];

	return { productColumns, productCategoryColumns, userColumns };
};

export default useTableColumns;
