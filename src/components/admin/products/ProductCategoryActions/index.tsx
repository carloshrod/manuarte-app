import { Button, notification, Space, Tooltip } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import PopConfirm from '../../common/PopConfirm';
import { productCategoryServices } from '@/services/productCategoryServices';
import { openModal } from '@/reducers/ui/uiSlice';
import { removeProductCategory } from '@/reducers/productCategories/productCategorySlice';
import { AxiosError } from 'axios';
import { ModalContent } from '@/types/enums';

const ProductCategoryActions = ({ record }: { record: ProductCategory }) => {
	const isEditable = true;
	const isDeletable = true;
	const dispatch = useDispatch();

	const handleEdit = () => {
		dispatch(
			openModal({
				title: 'Editar categoría de producto',
				content: ModalContent.productCategories,
				dataToEdit: record
			})
		);
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
		<Space size='small'>
			<Tooltip title={isEditable ? 'Editar' : ''}>
				<Button
					type='text'
					icon={
						<AiOutlineEdit
							size={20}
							color={isEditable ? '#0D6EFD' : '#A0AEC0'}
						/>
					}
					onClick={handleEdit}
				/>
			</Tooltip>
			<PopConfirm title={`${record.name}`} onConfirm={handleDelete}>
				<Tooltip title={isDeletable ? 'Eliminar' : ''}>
					<Button
						type='text'
						icon={
							<AiOutlineDelete
								size={20}
								color={isDeletable ? '#E53535' : '#FCBABA'}
							/>
						}
						disabled={!isDeletable}
					/>
				</Tooltip>
			</PopConfirm>
		</Space>
	);
};

export default ProductCategoryActions;
