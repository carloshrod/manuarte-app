import { useDispatch } from 'react-redux';
import TableActions from '../../common/TableActions';
import { openModal } from '@/reducers/ui/uiSlice';
import { ModalContent } from '@/types/enums';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { removeCustomer } from '@/reducers/users/userSlice';
import { userServices } from '@/services/userServices';

const CustomersActions = ({ record }: { record: Customer }) => {
	const dispatch = useDispatch();

	const handleEdit = () => {
		dispatch(
			openModal({
				title: 'Editar Cliente',
				content: ModalContent.customers,
				dataToEdit: record
			})
		);
	};

	const handleDelete = async () => {
		try {
			const res = await userServices.deleteCustomer(record.personId);
			if (res.status === 200) {
				dispatch(removeCustomer(record.personId));
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
			popTitle={record.fullName}
		/>
	);
};

export default CustomersActions;
