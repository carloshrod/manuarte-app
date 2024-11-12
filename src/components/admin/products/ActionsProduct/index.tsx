import { ModalContent } from '@/enums';
import { Button, notification, Space, Tooltip } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import PopConfirm from '../../common/PopConfirm';
import { openModal } from '@/reducers/ui/uiSlice';
import { deleteProductService } from '@/services/productServices';
import { removeProduct } from '@/reducers/products/productSlice';

const ActionsProduct = ({ record }: { record: ProductVariant }) => {
	const isEditable = true;
	const isDeletable = true;
	const dispatch = useDispatch();

	const handleEdit = () => {
		dispatch(
			openModal({
				title: 'Editar producto',
				content: ModalContent.products,
				dataToEdit: record
			})
		);
	};

	const handleDelete = async () => {
		const res = await deleteProductService(record.productId, record.id);
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
			<PopConfirm
				title={`${record.productName} - ${record.name}`}
				onConfirm={handleDelete}
			>
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

export default ActionsProduct;
