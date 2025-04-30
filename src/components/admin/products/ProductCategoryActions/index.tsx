import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { productCategoryServices } from '@/services/productCategoryServices';
import { removeProductCategory } from '@/reducers/productCategories/productCategorySlice';
import { AxiosError } from 'axios';
import { ModalContent } from '@/types/enums';
import TableActions from '../../common/ui/TableActions';
import { useModalStore } from '@/stores/modalStore';

const ProductCategoryActions = ({ record }: { record: ProductCategory }) => {
	const { openModal } = useModalStore.getState();
	const dispatch = useDispatch();

	const handleEdit = () => {
		openModal({
			title: 'Editar categoría de producto',
			content: ModalContent.productCategories,
			dataToHandle: record
		});
	};

	const handleDelete = async () => {
		try {
			const res = await productCategoryServices.deleteProductCategory(
				record.id
			);
			if (res.status === 200) {
				dispatch(removeProductCategory(record.id));
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
			popTitle={`${record.name}`}
		/>
	);
};

export default ProductCategoryActions;
