'use client';
import { Button } from 'antd';
import { IoMdDownload } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { downloadExcel, generateStockData } from '@/utils/documents';

const GenerateStockReportButton = ({ shopSlug }: { shopSlug: string }) => {
	const { stockItems } = useSelector((state: RootState) => state.stock);

	const handleDownloadExcel = async () => {
		try {
			const excelData = generateStockData(stockItems);

			if (excelData) {
				downloadExcel(excelData, `${shopSlug}-reporte-stock`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
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
		>
			Generar Reporte
		</Button>
	);
};

export default GenerateStockReportButton;
