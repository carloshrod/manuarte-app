import { downloadExcel, generateTopCustomersData } from '@/utils/documents';
import { Button } from 'antd';
import { IoMdDownload } from 'react-icons/io';

const GenerateTopCustomersReportButton = ({
	reportData,
	countryIsoCode
}: {
	reportData: Customer[];
	countryIsoCode: string;
}) => {
	const handleDownloadExcel = async () => {
		try {
			const excelData = generateTopCustomersData(reportData);
			if (excelData) {
				const fileName = `reporte-general-de-clientes-${countryIsoCode}`;
				const country = countryIsoCode === 'CO' ? 'Colombia' : 'Ecuador';
				const title = `Reporte de Clientes - ${country}`;

				downloadExcel({
					data: excelData,
					fileName,
					title,
					info: { countryIsoCode }
				});
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
			disabled={reportData?.length === 0}
		>
			Generar Reporte
		</Button>
	);
};

export default GenerateTopCustomersReportButton;
