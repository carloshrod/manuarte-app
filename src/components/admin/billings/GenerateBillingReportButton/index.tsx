'use client';
import { downloadExcel, generateBillingsData } from '@/utils/documents';
import { Button, Tooltip } from 'antd';
import moment from 'moment';
import { IoMdDownload } from 'react-icons/io';
import { useSelector } from 'react-redux';

const GenerateBillingReportButton = ({ shopSlug }: { shopSlug: string }) => {
	const { filteredBillings } = useSelector((state: RootState) => state.billing);

	const handleDownloadExcel = async () => {
		try {
			const excelData = generateBillingsData(filteredBillings);
			const date = filteredBillings[0].effectiveDate;

			if (excelData) {
				const shopName = shopSlug.toUpperCase().replace('-', ' ');
				const title = `Reporte de Ventas - ${shopName}`;

				downloadExcel({
					data: excelData,
					fileName: `${shopSlug}-reporte-ventas-${moment(date).format('YYYYMMDD')}`,
					title,
					date
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Tooltip title='Descargar reporte de ventas'>
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
				disabled={filteredBillings?.length === 0}
			>
				Generar Reporte
			</Button>
		</Tooltip>
	);
};

export default GenerateBillingReportButton;
