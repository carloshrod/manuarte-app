import { useDispatch } from 'react-redux';
import TableActions from '../../common/TableActions';
import { openModal } from '@/reducers/ui/uiSlice';
import { ModalContent } from '@/types/enums';

const ActionsCustomer = ({ record }: { record: Customer }) => {
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

	return (
		<TableActions
			onEdit={handleEdit}
			onDelete={() => null}
			popTitle={record.fullName}
		/>
	);
};

export default ActionsCustomer;
