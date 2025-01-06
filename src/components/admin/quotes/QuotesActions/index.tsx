import { openDrawer } from '@/reducers/ui/uiSlice';
import TableActions from '../../common/TableActions';
import { useDispatch } from 'react-redux';
import { DrawerContent } from '@/types/enums';
import { AxiosError } from 'axios';
import { notification } from 'antd';

const QuotesActions = ({ record }: { record: Quote }) => {
	const dispatch = useDispatch();

	const handleEdit = () => {
		dispatch(
			openDrawer({
				title: `Editar Cotización - ${record.serialNumber}`,
				content: DrawerContent.quotes,
				dataToEdit: record
			})
		);
	};

	const handleDelete = async () => {
		try {
			// const res = await productServices.deleteProduct(
			// 	record.productId,
			// 	record.id
			// );
			// if (res.status === 200) {
			// 	dispatch(
			// 		removeProduct({
			// 			productId: res.data.productDeleted ? record.productId : undefined,
			// 			productVariantId: record.id
			// 		})
			// 	);
			// 	notification.success({
			// 		message: res.data.message
			// 	});
			// }
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
			popTitle={`${record.serialNumber} - ${record.customerName}`}
		/>
	);
};

export default QuotesActions;
