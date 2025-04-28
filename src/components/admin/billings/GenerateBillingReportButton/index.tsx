'use client';
import { downloadExcel, generateBillingsData } from '@/utils/documents';
import { Button } from 'antd';
import moment from 'moment';
import { IoMdDownload } from 'react-icons/io';
import { useSelector } from 'react-redux';

const GenerateBillingReportButton = ({ shopSlug }: { shopSlug: string }) => {
	const { filteredBillings } = useSelector((state: RootState) => state.billing);

	const handleDownloadExcel = async () => {
		try {
			const excelData = generateBillingsData(filteredBillings);
			const date = filteredBillings[0].createdDate;

			if (excelData) {
				const shopName = shopSlug.toUpperCase().replace('-', ' ');
				const title = `Reporte Ventas - ${shopName}: ${moment(date).format('YYYY/MM/DD')}`;

				downloadExcel(
					excelData,
					`${shopSlug}-reporte-ventas-${moment(date).format('YYYYMMDD')}`,
					title
				);
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
			disabled={filteredBillings?.length === 0}
		>
			Generar Reporte
		</Button>
	);
};

export default GenerateBillingReportButton;
