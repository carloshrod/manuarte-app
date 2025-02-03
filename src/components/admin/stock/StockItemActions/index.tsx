import { useDispatch } from 'react-redux';
import TableActions from '../../common/ui/TableActions';
import { openModal } from '@/reducers/ui/uiSlice';
import { ModalContent } from '@/types/enums';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import { stockItemServices } from '@/services/stockItemServices';
import { removeStockItem } from '@/reducers/stockItems/stockItemSlice';

const StockItemActions = ({ record }: { record: StockItem }) => {
	const dispatch = useDispatch();

	const handleEdit = () => {
		dispatch(
			openModal({
				title: 'Editar Stock de Producto',
				content: ModalContent.stockItems,
				dataToEdit: record
			})
		);
	};

	const handleDelete = async () => {
		try {
			const res = await stockItemServices.delete(record.id);
			if (res.status === 200) {
				dispatch(removeStockItem(record.id));
				notification.success({
					message: res.data.message
				});
			}
		} catch (error) {
			console.error(error);
			const errorMsg =
				error instanceof AxiosError
					? error.response?.data.message
					: 'Ocurrió un error!';
			notification.error({ message: errorMsg });
		}
	};

	return (
		<TableActions
			onEdit={handleEdit}
			onDelete={handleDelete}
			popTitle={`${record.productName} - ${record.productVariantName}`}
		/>
	);
};

export default StockItemActions;
