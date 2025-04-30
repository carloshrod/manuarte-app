import { useDispatch } from 'react-redux';
import { notification } from 'antd';
import TableActions from '../../common/ui/TableActions';
import { removeStaff } from '@/reducers/users/userSlice';
import { userServices } from '@/services/userServices';
import { AxiosError } from 'axios';
import { ModalContent } from '@/types/enums';
import { useModalStore } from '@/stores/modalStore';

const StaffActions = ({ record }: { record: Staff }) => {
	const { openModal } = useModalStore.getState();
	const dispatch = useDispatch();

	const handleEdit = () => {
		openModal({
			title: 'Editar Staff',
			content: ModalContent.staff,
			dataToHandle: record
		});
	};

	const handleEditPermissions = () => {
		openModal({
			title: 'Editar Permisos',
			content: ModalContent.permissions,
			dataToHandle: record
		});
	};

	const handleDelete = async () => {
		try {
			const res = await userServices.deleteStaff(record.personId);
			if (res.status === 200) {
				dispatch(removeStaff(record.personId));
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
			onEditPermissions={handleEditPermissions}
			popTitle={record.fullName}
		/>
	);
};

export default StaffActions;
