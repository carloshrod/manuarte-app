import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { productServices } from '@/services/productServices';
import { openModal } from '@/reducers/ui/uiSlice';
import { removeProduct } from '@/reducers/products/productSlice';
import TableActions from '../../common/TableActions';
import { AxiosError } from 'axios';
import { ModalContent } from '@/types/enums';

const ActionsProduct = ({ record }: { record: ProductVariant }) => {
	const dispatch = useDispatch();

	const handleEdit = () => {
		dispatch(
			openModal({
				title: 'Editar Producto',
				content: ModalContent.products,
				dataToEdit: record
			})
		);
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

export default ActionsProduct;
