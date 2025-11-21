'use client';
import { BillingParams } from '@/libs/api/billing';
import { downloadExcel, generateBillingsData } from '@/utils/documents';
import { Button, Tooltip } from 'antd';
import moment from 'moment';
import { IoMdDownload } from 'react-icons/io';
import { useSelector } from 'react-redux';

interface Props {
	shopSlug: string;
	searchParams?: BillingParams;
}

const GenerateBillingReportButton = ({ shopSlug, searchParams }: Props) => {
	const { billings } = useSelector((state: RootState) => state.billing);
	const hasDateFilters = searchParams?.dateStart && searchParams?.dateEnd;

	const handleDownloadExcel = async () => {
		try {
			const excelData = generateBillingsData(billings);
			const date = searchParams?.dateStart;

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
				disabled={!hasDateFilters}
			>
				Generar Reporte
			</Button>
		</Tooltip>
	);
};

export default GenerateBillingReportButton;
