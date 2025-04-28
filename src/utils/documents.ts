import ExcelJS from 'exceljs';
import moment from 'moment';
import { PAYMENT_METHOD_MAP, TYPES_MAP } from './mappings';
import { formatToTitleCase } from './formats';

export interface ExcelStockData {
	'#': number;
	Nombre: string;
	Cantidad: number;
}

export interface ExcelStockHistoryData {
	'#': number;
	Fecha: string;
	Transacción: string;
	'Stock Antes': number;
	Cantidad: number;
	'Stock Después': number;
}

export interface ExcelBillingData {
	'#': number;
	Número: string;
	Cliente: string;
	'Medio de Pago': string;
	Total: number;
}

export const generateStockData = (stockItems: StockItem[]) => {
	try {
		let poExcelData: ExcelStockData[] = [];
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

export const generateStockHistoryData = (history: StockItemHistory[]) => {
	try {
		let poExcelData: ExcelStockHistoryData[] = [];
		if (history?.length > 0) {
			poExcelData = history?.map((item, i) => {
				const stockAfter =
					item.type === 'ENTER'
						? Number(item.stockBefore) + Number(item.quantity)
						: Number(item.stockBefore) - Number(item.quantity);

				return {
					'#': i + 1,
					Fecha: moment(item.createdDate).format('YYYY/MM/DD'),
					Transacción:
						item.type === 'BILLING' ? 'Factura' : TYPES_MAP[item.type],
					'Stock Antes': item.stockBefore,
					Cantidad: item.quantity,
					'Stock Después': stockAfter
				};
			});
		}

		return poExcelData;
	} catch (error) {
		console.error(error);
	}
};

export const generateBillingsData = (billings: Billing[]) => {
	try {
		let poExcelData: ExcelBillingData[] = [];
		if (billings?.length > 0) {
			poExcelData = billings?.map((item, i) => {
				return {
					'#': i + 1,
					Número: item.serialNumber,
					Cliente: formatToTitleCase(item.customerName) ?? 'Consumidor Final',
					'Medio de Pago': PAYMENT_METHOD_MAP[item.paymentMethod],
					Total: item.total
				};
			});
		}

		return poExcelData;
	} catch (error) {
		console.error(error);
	}
};

export const downloadExcel = async (
	data: ExcelStockData[] | ExcelStockHistoryData[] | ExcelBillingData[],
	prefix: string,
	title: string = ''
) => {
	try {
		const isBilling = prefix.includes('ventas');

		if (data?.length > 0) {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('Hoja 1');

			worksheet.mergeCells(
				'A1:' + String.fromCharCode(64 + Object.keys(data[0]).length) + '1'
			);
			const titleCell = worksheet.getCell('A1');
			titleCell.value = title;
			titleCell.font = { bold: true, size: 14 };
			titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

			const headers = Object.keys(data[0]);
			worksheet.addRow(headers);
			headers.forEach((_header, index) => {
				const cell = worksheet.getCell(2, index + 1);
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

			const fileName = isBilling
				? prefix
				: `${prefix}-${moment(new Date()).format('YYYYMMDDHHmmss')}`;

			link.download = `${fileName}.xlsx`;
			link.click();
		}
	} catch (error) {
		console.error(error);
	}
};
