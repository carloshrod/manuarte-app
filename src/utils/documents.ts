import ExcelJS from 'exceljs';
import moment from 'moment';

export interface ExcelData {
	'#': number;
	Nombre: string;
	Cantidad: number;
}

export const generateStockData = (stockItems: StockItem[]) => {
	try {
		let poExcelData: ExcelData[] = [];
		if (stockItems?.length > 0) {
			poExcelData = stockItems?.map((item, i) => {
				return {
					'#': i + 1,
					Código: item.vId,
					Nombre: `${item.productName} ${item.productVariantName}`,
					Cantidad: item.quantity
				};
			});
		}

		return poExcelData;
	} catch (error) {
		console.error(error);
	}
};

export const downloadExcel = async (data: ExcelData[], prefix: string) => {
	try {
		if (data?.length > 0) {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('Hoja 1');

			const headers = Object.keys(data[0]);
			worksheet.addRow(headers);
			headers.forEach((_header, index) => {
				const cell = worksheet.getCell(1, index + 1);
				cell.font = { bold: true };
				cell.alignment = { vertical: 'middle', horizontal: 'center' };
			});

			data.forEach(item => {
				const row = worksheet.addRow(Object.values(item));
				row.eachCell(cell => {
					cell.alignment = { vertical: 'middle', horizontal: 'center' };
				});
			});

			worksheet.columns = headers.map(() => ({ width: 20 }));

			const buffer = await workbook.xlsx.writeBuffer();
			const blob = new Blob([buffer], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});

			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = `${prefix}-${moment(new Date()).format(
				'YYYYMMDDHHmmss'
			)}.xlsx`;
			link.click();
		}
	} catch (error) {
		console.error(error);
	}
};
