import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { productServices } from '@/services/productServices';
import { removeProduct } from '@/reducers/products/productSlice';
import TableActions from '../../common/ui/TableActions';
import { AxiosError } from 'axios';
import { ModalContent } from '@/types/enums';
import { useModalStore } from '@/stores/modalStore';

const ProductActions = ({ record }: { record: ProductVariant }) => {
	const { openModal } = useModalStore.getState();
	const dispatch = useDispatch();

	const handleEdit = () => {
		openModal({
			title: 'Editar Producto',
			content: ModalContent.products,
			dataToHandle: record
		});
	};

	const handleDelete = async () => {
		try {
			const res = await productServices.deleteProduct(
				record.productId,
				record.id
			);
			if (res.status === 200) {
				dispatch(
					removeProduct({
						productId: res.data.productDeleted ? record.productId : undefined,
						productVariantId: record.id
					})
				);
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
			popTitle={`${record.productName} - ${record.name}`}
		/>
	);
};

export default ProductActions;
