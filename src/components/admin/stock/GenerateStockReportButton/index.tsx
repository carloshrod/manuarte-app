'use client';
import { Button } from 'antd';
import { IoMdDownload } from 'react-icons/io';
import { useSelector } from 'react-redux';
import {
	downloadExcel,
	generateCostStockData,
	generateRestockData,
	generateStockHistoryData
} from '@/utils/documents';
import { transactionServices } from '@/services/transactionServices';
import { ButtonVariantType } from 'antd/es/button';

const GenerateStockReportButton = ({
	shopSlug,
	history,
	product,
	variant = 'solid',
	label = 'Generar Reporte'
}: {
	shopSlug: string;
	history?: StockItemHistory[];
	product?: { productName: string; productVariantName: string };
	variant?: ButtonVariantType;
	label?: string;
}) => {
	const { stockItems } = useSelector((state: RootState) => state.stock);
	const data = history ?? stockItems;
	const isRestockData = label.toLowerCase().includes('pedido');

	const handleDownloadExcel = async () => {
		try {
			let excelData;

			if (history) {
				excelData = generateStockHistoryData(history);
			} else {
				const itemsInTransit = await transactionServices.getItemsInTransit(
					stockItems[0].stockId
				);
				excelData = isRestockData
					? generateRestockData(stockItems, itemsInTransit)
					: generateCostStockData(stockItems);
			}

			const sufix = history
				? 'reporte-historial-stock'
				: `${isRestockData ? 'reporte-pedido-stock' : 'reporte-stock'}`;
			const shopName = shopSlug.toUpperCase().replace('-', ' ');

			if (excelData) {
				const title = product
					? `${shopName}: ${product?.productName} - ${product?.productVariantName}`
					: `${isRestockData ? 'Pedido de ' : ''}Stock - ${shopName}`;

				downloadExcel({
					data: excelData,
					fileName: `${shopSlug}-${sufix}`,
					title
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Button
			variant={variant}
			color='primary'
			icon={
				<IoMdDownload
					size={18}
					style={{ display: 'flex', alignItems: 'center' }}
				/>
			}
			onClick={handleDownloadExcel}
			disabled={data?.length === 0}
		>
			{label}
		</Button>
	);
};

export default GenerateStockReportButton;
