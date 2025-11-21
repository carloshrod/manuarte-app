import { useRouter } from 'next/navigation';
import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import TableActions from '../../common/ui/TableActions';
import { userLibs } from '@/libs/api/user';
import { removeCustomer } from '@/reducers/users/userSlice';
import { useModalStore } from '@/stores/modalStore';
import { ROUTES } from '@/utils/routes';
import { ModalContent } from '@/types/enums';
import { AxiosError } from 'axios';

interface CustomersActionsProps {
	record: Customer;
	isTop?: boolean;
	isAdmin: boolean;
}

const CustomersActions = ({
	record,
	isTop = false,
	isAdmin
}: CustomersActionsProps) => {
	const { openModal } = useModalStore.getState();
	const dispatch = useDispatch();
	const router = useRouter();

	const handleEdit = () => {
		openModal({
			title: 'Editar Cliente',
			content: ModalContent.customers,
			dataToHandle: record
		});
	};

	const handleDelete = async () => {
		try {
			const res = await userLibs.deleteCustomer(record.personId);
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
			onEdit={!isTop ? handleEdit : undefined}
			onShowDetails={
				isAdmin
					? () => router.push(`${ROUTES.CUSTOMERS}/${record.id}`)
					: undefined
			}
			onDelete={isAdmin && !isTop ? handleDelete : undefined}
			popTitle={record.fullName}
		/>
	);
};

export default CustomersActions;
