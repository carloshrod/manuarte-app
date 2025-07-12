import { downloadExcel, generateTopCustomersData } from '@/utils/documents';
import { Button } from 'antd';
import { IoMdDownload } from 'react-icons/io';

const GenerateTopCustomersReportButton = ({
	reportData
}: {
	reportData: Customer[];
}) => {
	const handleDownloadExcel = async () => {
		try {
			const excelData = generateTopCustomersData(reportData);
			if (excelData) {
				const fileName = `reporte-general-de-clientes`;
				const title = 'Reporte de Clientes';
				downloadExcel({ data: excelData, fileName, title });
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
