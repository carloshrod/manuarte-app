import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import TableActions from '../../common/ui/TableActions';
import { useModalStore } from '@/stores/modalStore';
import { removeStockItem } from '@/reducers/stockItems/stockItemSlice';
import { stockItemServices } from '@/services/stockItemServices';
import { DrawerContent, ModalContent } from '@/types/enums';
import { useDrawerStore } from '@/stores/drawerStore';

const StockItemActions = ({ record }: { record: StockItem }) => {
	const { openModal } = useModalStore.getState();
	const { openDrawer } = useDrawerStore.getState();
	const dispatch = useDispatch();
	const { shopSlug } = useParams();
	const shopName = (shopSlug as string).toUpperCase().replace('-', ' ');

	const handleEdit = () => {
		openModal({
			title: 'Editar Stock de Producto',
			content: ModalContent.stockItems,
			dataToHandle: record
		});
	};

	const handleTracking = () => {
		openDrawer({
			title: `Trazabilidad - ${shopName}`,
			content: DrawerContent.stockItemHistory,
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
			onTracking={handleTracking}
			onDelete={handleDelete}
			popTitle={`${record.productName} - ${record.productVariantName}`}
		/>
	);
};

export default StockItemActions;
