import useTable from '@/hooks/useTable';
import { FilterValue } from 'antd/es/table/interface';
import CopyableText from '../../common/ui/CopyableText';
import { QRCode, Space, TableColumnsType } from 'antd';
import { formatDate, formatToTitleCase } from '@/utils/formats';
import ProductActions from '../ProductActions';
import ProductCategoryActions from '../ProductCategoryActions';

const ProductCols = ({
	tableFilters
}: {
	tableFilters?: Record<string, FilterValue | null>;
}) => {
	const { getColumnSearchProps } = useTable();

	const productVariantColumns: TableColumnsType<ProductVariant> = [
		{
			title: '#',
			dataIndex: 'vId',
			key: 'vId',
			filteredValue: tableFilters?.vId || null,
			...getColumnSearchProps('vId'),
			render: value => <CopyableText text={value} />,
			width: 105
		},
		{
			title: 'NOMBRE',
			dataIndex: 'productName',
			key: 'productName',
			filteredValue: tableFilters?.productName || null,
			...getColumnSearchProps('productName'),
			width: 150
		},
		{
			title: 'PRESENTACIÓN',
			dataIndex: 'name',
			key: 'name',
			filteredValue: tableFilters?.name || null,
			...getColumnSearchProps('name'),
			render: value => formatToTitleCase(value),
			width: 140
		},
		{
			title: 'DESCRIPCIÓN',
			dataIndex: 'productDescription',
			key: 'productDescription',
			filteredValue: tableFilters?.productDescription || null,
			...getColumnSearchProps('productDescription'),
			width: 150
		},

		{
			title: 'CATEGORÍA',
			dataIndex: 'productCategoryName',
			key: 'productCategoryName',
			filteredValue: tableFilters?.productCategoryName || null,
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
			...getColumnSearchProps('cId', true),
			width: 50
		},
		{
			title: 'NOMBRE',
			dataIndex: 'name',
			key: 'name',
			...getColumnSearchProps('name', true),
			width: 200
		},
		{
			title: 'GRUPO',
			dataIndex: 'groupName',
			key: 'groupName',
			...getColumnSearchProps('groupName', true),
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

	return { productVariantColumns, productCategoryColumns };
};

export default ProductCols;
