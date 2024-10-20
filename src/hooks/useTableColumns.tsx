import { TableColumnsType } from 'antd';
import useTable from './useTable';
import moment from 'moment';
import Image from 'next/image';
import ActionsProduct from '@/components/admin/products/ActionsProduct';

const useTableColumns = () => {
	const { getColumnSearchProps: getProductColumnSearchProps } =
		useTable<Product>();
	const { getColumnSearchProps: getProductCatSearchProps } =
		useTable<ProductCategory>();

	const productColumns: TableColumnsType<Product> = [
		{
			title: '#',
			dataIndex: 'pId',
			key: 'pId',
			...getProductColumnSearchProps('pId'),
			width: 100
		},
		{
			title: 'NOMBRE',
			dataIndex: 'name',
			key: 'name',
			width: 150,
			...getProductColumnSearchProps('name')
		},
		{
			title: 'CATEGORÍA',
			dataIndex: 'categoryProductId',
			key: 'categoryProductId',
			width: 120,
			...getProductColumnSearchProps('categoryProductId')
		},
		{
			title: 'FECHA DE CREACIÓN',
			dataIndex: 'createdDate',
			key: 'createdDate',
			sorter: (a: DataTable, b: Product) =>
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
			title: 'CÓDIGO QR',
			dataIndex: ['variantProducts', 'qrCode'],
			key: 'qrCode',
			render: (_value: string, record: Product) => {
				const { variantProducts } = record || {};
				return (
					<Image
						src={variantProducts[0]?.qrCode}
						width={80}
						height={80}
						alt='QR Image'
					/>
				);
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
			...getProductCatSearchProps('cId'),
			width: 100
		},
		{
			title: 'NOMBRE',
			dataIndex: 'name',
			key: 'name',
			width: 150,
			...getProductCatSearchProps('name')
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

	return { productColumns, productCategoryColumns };
};

export default useTableColumns;
