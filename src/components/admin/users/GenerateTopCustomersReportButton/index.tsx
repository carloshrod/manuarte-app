import { useState } from 'react';
import { Button } from 'antd';
import { IoMdDownload } from 'react-icons/io';
import { customerLibs, CustomerParams } from '@/libs/api/customer';
import { downloadExcel, generateTopCustomersData } from '@/utils/documents';

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
			const { topCustomers } = await customerLibs.getTopCustomers(reportParams);
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
