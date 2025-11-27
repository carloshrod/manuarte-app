import useTable from '@/hooks/useTable';
import { getStockStatusColor } from '@/hooks/utils';
import { formatCurrency, formatToTitleCase } from '@/utils/formats';
import { TableColumnsType } from 'antd';
import StockItemActions from '../StockItemActions';
import { useSession } from 'next-auth/react';
import { FilterValue } from 'antd/es/table/interface';

const StockItemCols = ({
	tableFilters
}: {
	tableFilters: Record<string, FilterValue | null>;
}) => {
	const { getColumnSearchProps } = useTable();
	const { data: session } = useSession();
	const isAdmin = session?.user?.roleName === 'admin';

	const stockItemsColumns: TableColumnsType<StockItem> = [
		{
			title: 'PRODUCTO',
			dataIndex: 'productName',
			key: 'productName',
			filteredValue: tableFilters.productName || null,
			...getColumnSearchProps('productName'),
			render: value => formatToTitleCase(value),
			width: 250
		},
		{
			title: 'PRESENTACIÓN',
			dataIndex: 'productVariantName',
			key: 'productVariantName',
			filteredValue: tableFilters.productVariantName || null,
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
		{
			title: 'EN TRANSITO',
			dataIndex: 'quantityInTransit',
			key: 'quantityInTransit',
			render: value => {
				return (
					<span className={`${value > 0 && 'text-[#0D6EFD]'} font-semibold`}>
						{value}
					</span>
				);
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
						width: 80,
						align: 'center' as const
					},
					{
						title: 'CANT. MAX',
						dataIndex: 'maxQty',
						key: 'maxQty',
						width: 80,
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

	return { stockItemsColumns };
};

export default StockItemCols;
