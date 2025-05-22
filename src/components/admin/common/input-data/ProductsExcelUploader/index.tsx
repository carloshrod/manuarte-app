import { notification, Upload, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { productServices } from '@/services/productServices';

const { Dragger } = Upload;

const ProductsExcelUploader = ({
	onAddBulkProduct,
	fromStockId
}: {
	onAddBulkProduct: (productList: any[]) => void;
	fromStockId: string;
}) => {
	const props: UploadProps = {
		name: 'file',
		multiple: false,
		accept: '.xlsx,.xls',
		showUploadList: false,
		customRequest({ file, onSuccess }) {
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
					row =>
						Array.isArray(row) &&
						row.includes('Código') &&
						row.includes('Producto') &&
						row.includes('Cantidad requerida')
				);

				if (headerRowIndex === -1) {
					notification.error({
						message: 'No se encontraron las columnas requeridas'
					});
					return;
				}

				const headers = allRows[headerRowIndex];
				const rows = allRows.slice(headerRowIndex + 1);

				const productCodeIndex = headers.indexOf('Código');
				const nameIndex = headers.indexOf('Producto');
				const requiredQtyIndex = headers.indexOf('Cantidad requerida');

				if (productCodeIndex === -1 || requiredQtyIndex === -1) {
					notification.error({
						message: 'No se encontraron las columnas requeridas'
					});
					return;
				}

				const filteredData = rows
					.map((row: any[]) => ({
						productCode: row[productCodeIndex],
						name: row[nameIndex],
						requiredQty: Number(row[requiredQtyIndex])
					}))
					.filter(item => item.requiredQty > 0);

				const resData = await productServices.bulkSearchProductVariants(
					filteredData.map(item => item.productCode),
					fromStockId
				);

				const processedData = resData.reverse().map((resItem: any) => {
					const match = filteredData.find(
						item => item.productCode === resItem.productCode
					);

					return {
						...resItem,
						name: match?.name || '',
						requiredQty: match?.requiredQty || 0
					};
				});

				onAddBulkProduct(processedData);
				if (onSuccess) onSuccess('ok');
			};

			reader.onerror = () => {
				notification.error({
					message: 'Error al leer el archivo'
				});
			};

			reader.readAsArrayBuffer(file as Blob);
		}
	};

	return (
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
	);
};

export default ProductsExcelUploader;
