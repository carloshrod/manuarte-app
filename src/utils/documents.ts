import ExcelJS, { Fill } from 'exceljs';
import { PAYMENT_METHOD_MAP, TRANSACTION_TYPES_MAP } from './mappings';
import { formatDate, formatToTitleCase } from './formats';

export interface ExcelStockData {
	'#': number;
	Código: string;
	Producto: string;
	'Cantidad mínima': number;
	'Cantidad máxima': number;
	'Cantidad actual': number;
	'Cantidad requerida': number;
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
	'Número de Serial': string;
	Cliente: string;
	'Medio de Pago': string;
	Total: number;
}

export const generateStockData = (stockItems: StockItem[]) => {
	try {
		let poExcelData: ExcelStockData[] = [];

		if (stockItems?.length > 0) {
			poExcelData = stockItems.reduce((acc, item) => {
				const requiredQty = Number(item.maxQty) - Number(item.quantity);

				if (item.maxQty > 0 && item.minQty > 0 && requiredQty > 0) {
					acc.push({
						'#': acc.length + 1,
						Código: item.vId,
						Producto: `${item.productName} - ${item.productVariantName}`,
						'Cantidad mínima': item.minQty,
						'Cantidad máxima': item.maxQty,
						'Cantidad actual': item.quantity,
						'Cantidad requerida': requiredQty
					});
				}
				return acc;
			}, [] as ExcelStockData[]);
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
					Fecha: formatDate(item.createdDate) ?? '--',
					Transacción:
						item.type === 'BILLING'
							? 'Factura'
							: TRANSACTION_TYPES_MAP[item.type],
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
					'Número de Serial': item.serialNumber,
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
	fileName: string,
	title: string = '',
	date?: string
) => {
	try {
		if (data?.length > 0) {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('Hoja 1');
			const isUsd = title.toLowerCase().includes('quito');

			const headers = Object.keys(data[0]);
			const totalColumns = headers.length;

			const lastColLetter = getColLetter(totalColumns - 1);
			const titleEndColLetter = getColLetter(totalColumns - 2);

			// Title:
			worksheet.mergeCells(`A1:${titleEndColLetter}2`);
			const titleCell = worksheet.getCell('A1');
			titleCell.value = title;
			titleCell.font = { bold: true, size: 11 };
			titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
			titleCell.border = {
				top: { style: 'thin' },
				left: { style: 'thin' },
				bottom: { style: 'thin' },
				right: { style: 'thin' }
			};
			titleCell.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: { argb: 'D9D9D9' }
			};

			// Date:
			worksheet.mergeCells(`${lastColLetter}1:${lastColLetter}2`);
			const dateCell = worksheet.getCell(`${lastColLetter}1`);
			dateCell.value = date ? formatDate(date) : formatDate(new Date());
			dateCell.font = { bold: true, size: 11 };
			dateCell.alignment = { vertical: 'middle', horizontal: 'center' };
			dateCell.border = {
				top: { style: 'thin' },
				left: { style: 'thin' },
				bottom: { style: 'thin' },
				right: { style: 'thin' }
			};
			dateCell.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: { argb: 'D9D9D9' }
			};

			// Headers:
			worksheet.addRow(headers);
			headers.forEach((_header, index) => {
				const cell = worksheet.getCell(3, index + 1);
				cell.font = { bold: true };
				cell.alignment = { vertical: 'middle', horizontal: 'center' };
				cell.border = {
					top: { style: 'thin' },
					left: { style: 'thin' },
					bottom: { style: 'thin' },
					right: { style: 'thin' }
				};
				cell.fill = {
					type: 'pattern',
					pattern: 'solid',
					fgColor: { argb: 'C5D9F1' }
				};
			});

			// Data:
			data.forEach(item => {
				const row = worksheet.addRow(Object.values(item));

				row.eachCell((cell, colNumber) => {
					cell.alignment = { vertical: 'middle', horizontal: 'center' };
					cell.border = {
						top: { style: 'thin' },
						left: { style: 'thin' },
						bottom: { style: 'thin' },
						right: { style: 'thin' }
					};

					if (headers[colNumber - 1] === 'Código') {
						cell.numFmt = '@';
						cell.value = String(cell.value);
					}

					if (headers[colNumber - 1] === 'Cantidad actual') {
						formatRequiredQtyCol(item, cell);
					}

					const transactionIndex = headers.findIndex(h => h === 'Transacción');
					if (colNumber - 1 === transactionIndex) {
						formatTransactionCol(item, cell);
					}

					if (headers[colNumber - 1] === 'Total') {
						cell.numFmt = isUsd ? '"$" #,##0.00' : '"$" #,##0';
						cell.alignment = { vertical: 'middle', horizontal: 'right' };
					}

					if (
						headers[colNumber - 1] === 'Producto' ||
						headers[colNumber - 1] === 'Cliente' ||
						headers[colNumber - 1] === 'Medio de Pago'
					) {
						cell.alignment = { vertical: 'middle', horizontal: 'left' };
					}
				});
			});

			const requiredQtyIndex = headers.findIndex(
				h => h === 'Cantidad requerida'
			);
			if (requiredQtyIndex !== -1) {
				countRequiredQty(requiredQtyIndex, worksheet, headers);
			}

			const totalIndex = headers.findIndex(h => h === 'Total');
			if (totalIndex !== -1) {
				const sumRow = worksheet.addRow(Array(headers.length).fill(''));
				const totalRowNumber = worksheet.rowCount;
				sumTotals(totalIndex, totalRowNumber, sumRow, isUsd);
			}

			const COL_WIDTHS: Record<string, number> = {
				'#': 5,
				Producto: 70,
				Cliente: 30
			};

			worksheet.columns = headers.map(header => ({
				width: COL_WIDTHS[header] ?? 20
			}));

			const buffer = await workbook.xlsx.writeBuffer();
			const blob = new Blob([buffer], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			});

			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);

			link.download = `${fileName}.xlsx`;
			link.click();
		}
	} catch (error) {
		console.error(error);
	}
};

const formatRequiredQtyCol = (item: any, cell: ExcelJS.Cell) => {
	let fillColor = '10B981';

	const stockPercentage =
		(item['Cantidad actual'] / item['Cantidad máxima']) * 100;

	if (item['Cantidad actual'] <= item['Cantidad mínima']) {
		fillColor = 'E53535';
	} else if (stockPercentage <= 75) {
		fillColor = 'EAB308';
	}

	cell.fill = {
		type: 'pattern',
		pattern: 'solid',
		fgColor: { argb: fillColor }
	};
};

const formatTransactionCol = (item: any, cell: ExcelJS.Cell) => {
	const TYPE_COLORS: Record<string, string> = {
		Entrada: '0D6EFD',
		Transferencia: 'EAB308',
		Salida: 'E53535',
		Factura: '10b981'
	};

	const fillColor = TYPE_COLORS[item['Transacción']] ?? 'FFFFFF';

	cell.fill = {
		type: 'pattern',
		pattern: 'solid',
		fgColor: { argb: fillColor }
	};
};

const sumTotals = (
	totalIndex: number,
	totalRowNumber: number,
	sumRow: ExcelJS.Row,
	isUsd: boolean
) => {
	const colLetter = getColLetter(totalIndex);

	const fillColor: Fill = {
		type: 'pattern',
		pattern: 'solid',
		fgColor: { argb: 'C6E0B4' }
	};

	const totalCell = sumRow.getCell(totalIndex + 1);
	totalCell.value = {
		formula: `SUM(${colLetter}4:${colLetter}${totalRowNumber - 1})`
	};

	totalCell.font = { bold: true };
	totalCell.alignment = { horizontal: 'right' };
	totalCell.border = {
		top: { style: 'thin' },
		left: { style: 'thin' },
		bottom: { style: 'thin' },
		right: { style: 'thin' }
	};
	totalCell.fill = fillColor;
	totalCell.numFmt = isUsd ? '"$" #,##0.00' : '"$" #,##0';

	const labelCell = sumRow.getCell(totalIndex);
	labelCell.value = 'Total ventas del día';
	labelCell.font = { bold: true };
	labelCell.alignment = { horizontal: 'center' };
	labelCell.border = {
		top: { style: 'thin' },
		left: { style: 'thin' },
		bottom: { style: 'thin' },
		right: { style: 'thin' }
	};
	labelCell.fill = fillColor;
};

const countRequiredQty = (
	requiredQtyIndex: number,
	worksheet: ExcelJS.Worksheet,
	headers: string[]
) => {
	const totalRow = worksheet.addRow(Array(headers.length).fill(''));
	const totalRowNumber = totalRow.number;

	const labelStartIndex = requiredQtyIndex - 2;
	const labelEndIndex = requiredQtyIndex - 1;
	const sumIndex = requiredQtyIndex;

	const labelStartLetter = getColLetter(labelStartIndex);
	const labelEndLetter = getColLetter(labelEndIndex);
	const sumLetter = getColLetter(sumIndex);

	worksheet.mergeCells(
		`${labelStartLetter}${totalRowNumber}:${labelEndLetter}${totalRowNumber}`
	);
	const labelCell = worksheet.getCell(`${labelStartLetter}${totalRowNumber}`);
	labelCell.value = 'Cantidad total requerida de items';
	labelCell.font = { bold: true };
	labelCell.alignment = { vertical: 'middle', horizontal: 'center' };
	labelCell.border = {
		top: { style: 'thin' },
		left: { style: 'thin' },
		bottom: { style: 'thin' },
		right: { style: 'thin' }
	};
	labelCell.fill = {
		type: 'pattern',
		pattern: 'solid',
		fgColor: { argb: 'C5D9F1' }
	};

	const sumCell = worksheet.getCell(`${sumLetter}${totalRowNumber}`);
	sumCell.value = {
		formula: `SUM(${sumLetter}4:${sumLetter}${totalRowNumber - 1})`
	};
	sumCell.numFmt = '#,##0';
	sumCell.font = { bold: true };
	sumCell.alignment = { vertical: 'middle', horizontal: 'center' };
	sumCell.border = {
		top: { style: 'thin' },
		left: { style: 'thin' },
		bottom: { style: 'thin' },
		right: { style: 'thin' }
	};
	sumCell.fill = {
		type: 'pattern',
		pattern: 'solid',
		fgColor: { argb: 'C5D9F1' }
	};
};

const getColLetter = (index: number) => {
	let col = '';
	while (index >= 0) {
		col = String.fromCharCode((index % 26) + 65) + col;
		index = Math.floor(index / 26) - 1;
	}
	return col;
};
