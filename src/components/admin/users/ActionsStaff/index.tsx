import { openModal } from '@/reducers/ui/uiSlice';
import { ModalContent } from '@/enums';
import { useDispatch } from 'react-redux';
import TableActions from '../../common/TableActions';

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

	return (
		<TableActions
			onEdit={handleEdit}
			onDelete={() => null}
			popTitle={record.fullName}
		/>
	);
};

export default ActionsStaff;
