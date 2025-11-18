import { CustomerParams, userLibs } from '@/libs/api/user';
import { downloadExcel, generateTopCustomersData } from '@/utils/documents';
import { Button } from 'antd';
import { useState } from 'react';
import { IoMdDownload } from 'react-icons/io';

const GenerateTopCustomersReportButton = ({
	reportParams
}: {
	reportParams: CustomerParams;
}) => {
	const [reportData, setReportData] = useState<Customer[]>();
	const [loading, setLoading] = useState(false);

	const handleDownloadExcel = async () => {
		try {
			setLoading(true);
			const { topCustomers } = await userLibs.getTopCustomers(reportParams);
			setReportData(topCustomers);
			const excelData = generateTopCustomersData(topCustomers);
			if (excelData) {
				const fileName = `reporte-general-de-clientes-${reportParams.isoCode}`;
				const country = reportParams.isoCode === 'CO' ? 'Colombia' : 'Ecuador';
				const title = `Reporte de Clientes - ${country}`;

				downloadExcel({
					data: excelData,
					fileName,
					title,
					info: { countryIsoCode: reportParams.isoCode }
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
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
			disabled={reportData?.length === 0 || loading}
			loading={loading}
		>
			{loading ? 'Generando...' : 'Generar Reporte'}
		</Button>
	);
};

export default GenerateTopCustomersReportButton;
