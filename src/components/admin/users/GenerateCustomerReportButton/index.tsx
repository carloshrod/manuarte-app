'use client';
import { downloadExcel, generateCustomerData } from '@/utils/documents';
import { Button } from 'antd';
import { IoMdDownload } from 'react-icons/io';

export type CustomerInfo = {
	fullName: string;
	dni: string;
	phoneNumber: string;
	email: string;
	city: string;
	location: string;
	cityName: string;
	regionName: string;
	countryIsoCode: string;
	billingsCount: number;
	totalSpent: number;
};

interface GenerateCustomerReportButtonProps {
	info: CustomerInfo;
	recentActivity: Billing[] | Quote[];
}

const GenerateCustomerReportButton = ({
	info,
	recentActivity
}: GenerateCustomerReportButtonProps) => {
	const handleDownloadExcel = async () => {
		try {
			const { fullName } = info;
			const excelData = generateCustomerData(recentActivity);

			if (excelData) {
				const fileName = `reporte-cliente-${fullName.split(' ').join('-')}`;
				const title = fullName;

				downloadExcel({ data: excelData, fileName, title, info });
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
			disabled={!info || recentActivity?.length === 0}
		>
			Generar Reporte
		</Button>
	);
};

export default GenerateCustomerReportButton;
