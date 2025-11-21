import { useState } from 'react';
import { notification, Upload, UploadProps, Spin } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { productLibs } from '@/libs/api/product';
import * as XLSX from 'xlsx';
import { AxiosError } from 'axios';

const { Dragger } = Upload;

const ProductsExcelUploader = ({
	onAddBulkProduct,
	fromStockId
}: {
	onAddBulkProduct: (productList: any[]) => void;
	fromStockId: string;
}) => {
	const [loading, setLoading] = useState(false);

	const props: UploadProps = {
		name: 'file',
		multiple: false,
		accept: '.xlsx,.xls',
		showUploadList: false,
		beforeUpload(file) {
			const isExcel =
				file.type ===
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
				file.type === 'application/vnd.ms-excel' ||
				file.name.endsWith('.xlsx') ||
				file.name.endsWith('.xls');

			if (!isExcel) {
				notification.error({
					message: '¡Formato no válido!',
					description: 'Solo se permiten archivos .xlsx o .xls'
				});
				return Upload.LIST_IGNORE;
			}

			return true;
		},
		customRequest({ file, onSuccess }) {
			setLoading(true);
			const reader = new FileReader();

			reader.onload = async e => {
				const data = new Uint8Array(e.target?.result as ArrayBuffer);
				const workbook = XLSX.read(data, { type: 'array' });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];

				const allRows = XLSX.utils.sheet_to_json<string[]>(worksheet, {
					header: 1
				});

				const headerRowIndex = allRows.findIndex(
					row => row.includes('Código') && row.includes('Cantidad requerida')
				);

				if (headerRowIndex === -1) {
					notification.error({
						message: 'No se encontraron las columnas requeridas'
					});
					setLoading(false);
					return;
				}

				const headers = allRows[headerRowIndex];
				const rows = allRows.slice(headerRowIndex + 1);

				const productCodeIndex = headers.indexOf('Código');
				const requiredQtyIndex = headers.indexOf('Cantidad requerida');

				const filteredData = rows
					.filter(row => row[productCodeIndex])
					.map((row: any[]) => ({
						productCode: row[productCodeIndex],
						requiredQty: Number(row[requiredQtyIndex])
					}))
					.filter(item => item.requiredQty > 0);

				const productCodes = filteredData.map(item => item.productCode.trim());

				try {
					const resData = await productLibs.bulkSearchProductVariants(
						productCodes,
						fromStockId
					);

					const processedData = resData.reverse().map((resItem: any) => {
						const match = filteredData.find(
							item => item.productCode.trim() === resItem.productCode.trim()
						);

						return {
							...resItem,
							requiredQty: match?.requiredQty || 0
						};
					});

					onAddBulkProduct(processedData);
					if (onSuccess) onSuccess('ok');
				} catch (error) {
					console.error(error);
					const message =
						error instanceof AxiosError
							? error?.response?.data.message
							: 'Ocurrió un error. Inténtalo más tarde';
					notification.error({ message, duration: null });
				} finally {
					setLoading(false);
				}
			};

			reader.onerror = () => {
				notification.error({
					message: 'Error al leer el archivo'
				});
				setLoading(false);
			};

			reader.readAsArrayBuffer(file as Blob);
		}
	};

	return (
		<Spin spinning={loading}>
			<Dragger {...props} style={{ marginBottom: 12 }}>
				<p className='ant-upload-drag-icon'>
					<InboxOutlined />
				</p>
				<p className='ant-upload-text'>
					Haz clic o arrastra un archivo excel para cargarlo
				</p>
				<p className='ant-upload-hint'>
					Asegurate de que tenga el formato correcto
				</p>
			</Dragger>
		</Spin>
	);
};

export default ProductsExcelUploader;
