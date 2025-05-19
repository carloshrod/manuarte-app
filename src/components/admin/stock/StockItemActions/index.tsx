import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import TableActions from '../../common/ui/TableActions';
import { useModalStore } from '@/stores/modalStore';
import { removeStockItem } from '@/reducers/stockItems/stockItemSlice';
import { stockItemServices } from '@/services/stockItemServices';
import { ModalContent } from '@/types/enums';

const StockItemActions = ({ record }: { record: StockItem }) => {
	const { openModal } = useModalStore.getState();
	const dispatch = useDispatch();
	const { shopSlug } = useParams();
	const route = useRouter();

	const handleEdit = () => {
		openModal({
			title: 'Editar Stock de Producto',
			content: ModalContent.stockItems,
			dataToHandle: record
		});
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
			record={record}
			onEdit={handleEdit}
			onTracking={() =>
				route.push(
					`/admin/stock/${shopSlug}/historial?stockItemId=${record.id}`
				)
			}
			onDelete={handleDelete}
			popTitle={`${record.productName} - ${record.productVariantName}`}
		/>
	);
};

export default StockItemActions;
