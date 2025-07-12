'use client';
import { Button, Tooltip } from 'antd';
import { IoMdDownload } from 'react-icons/io';
import { useSelector } from 'react-redux';
import {
	downloadExcel,
	generateStockData,
	generateStockHistoryData
} from '@/utils/documents';
import { transactionServices } from '@/services/transactionServices';

const GenerateStockReportButton = ({
	shopSlug,
	history,
	product
}: {
	shopSlug: string;
	history?: StockItemHistory[];
	product?: { productName: string; productVariantName: string };
}) => {
	const { stockItems } = useSelector((state: RootState) => state.stock);
	const data = history ?? stockItems;

	const handleDownloadExcel = async () => {
		try {
			let excelData;

			if (history) {
				excelData = generateStockHistoryData(history);
			} else {
				const itemsInTransit = await transactionServices.getItemsInTransit(
					stockItems[0].stockId
				);
				excelData = generateStockData(stockItems, itemsInTransit);
			}

			const sufix = history
				? 'reporte-historial-stock'
				: 'reporte-pedido-stock';
			const shopName = shopSlug.toUpperCase().replace('-', ' ');

			if (excelData) {
				const title = product
					? `${shopName}: ${product?.productName} - ${product?.productVariantName}`
					: `Pedido de Stock - ${shopName}`;

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
		<Tooltip
			title={
				history
					? 'Descargar historial de stock'
					: 'Descargar reporte de stock para pedidos de producción'
			}
		>
			<Button
				variant='solid'
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
				Generar Reporte
			</Button>
		</Tooltip>
	);
};

export default GenerateStockReportButton;
