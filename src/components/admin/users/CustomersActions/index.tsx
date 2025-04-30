import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import TableActions from '../../common/ui/TableActions';
import { removeCustomer } from '@/reducers/users/userSlice';
import { userServices } from '@/services/userServices';
import { ModalContent } from '@/types/enums';
import { useModalStore } from '@/stores/modalStore';

const CustomersActions = ({ record }: { record: Customer }) => {
	const { openModal } = useModalStore.getState();
	const dispatch = useDispatch();

	const handleEdit = () => {
		openModal({
			title: 'Editar Cliente',
			content: ModalContent.customers,
			dataToHandle: record
		});
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
