import { useDispatch } from 'react-redux';
import { notification } from 'antd';
import TableActions from '../../common/TableActions';
import { openModal } from '@/reducers/ui/uiSlice';
import { removeStaff } from '@/reducers/users/userSlice';
import { userServices } from '@/services/userServices';
import { AxiosError } from 'axios';
import { ModalContent } from '@/types/enums';

const ActionsStaff = ({ record }: { record: Staff }) => {
	const dispatch = useDispatch();

	const handleEdit = () => {
		dispatch(
			openModal({
				title: 'Editar Staff',
				content: ModalContent.staff,
				dataToEdit: record
			})
		);
	};

	const handleEditPermissions = () => {
		dispatch(
			openModal({
				title: 'Editar Permisos',
				content: ModalContent.permissions,
				dataToEdit: record
			})
		);
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

export default ActionsStaff;
