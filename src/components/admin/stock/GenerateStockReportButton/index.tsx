'use client';
import { Button } from 'antd';
import { IoMdDownload } from 'react-icons/io';
import {
	downloadExcel,
	generateCostStockData,
	generateRestockData,
	generateStockHistoryData
} from '@/utils/documents';
import { ButtonVariantType } from 'antd/es/button';
import { stockItemLibs } from '@/libs/api/stock-item';

interface Props {
	shopSlug: string;
	stockId?: string;
	history?: StockItemHistory[];
	product?: { productName: string; productVariantName: string };
	variant?: ButtonVariantType;
	label?: string;
	isMoldesReport?: boolean;
}

const GenerateStockReportButton = ({
	shopSlug,
	stockId,
	history,
	product,
	variant = 'solid',
	label = 'Generar Reporte',
	isMoldesReport = false
}: Props) => {
	const isRestockData = label.toLowerCase().includes('pedido');

	const handleDownloadExcel = async () => {
		try {
			let excelData;

			const { stockItems } =
				stockId &&
				(await stockItemLibs.getAllByStock({
					stockId,
					report: true
				}));

			if (history) {
				excelData = generateStockHistoryData(history);
			} else {
				excelData = isRestockData
					? generateRestockData(stockItems, isMoldesReport)
					: generateCostStockData(stockItems);
			}

			const restockSufix = isMoldesReport
				? 'reporte-pedido-moldes-stock'
				: 'reporte-pedido-stock';

			const sufix = history
				? 'reporte-historial-stock'
				: `${isRestockData ? restockSufix : 'reporte-stock'}`;
			const shopName = shopSlug.toUpperCase().replace('-', ' ');

			if (excelData) {
				const title = product
					? `${shopName}: ${product?.productName} - ${product?.productVariantName}`
					: `${isRestockData ? 'Pedido de ' : ''}Stock ${isMoldesReport ? 'de Moldes ' : ''}- ${shopName}`;

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
		>
			{label}
		</Button>
	);
};

export default GenerateStockReportButton;
