import { useDispatch } from 'react-redux';
import TableActions from '../../common/ui/TableActions';
import { openDrawer } from '@/reducers/ui/uiSlice';
import { DrawerContent } from '@/types/enums';

const TransactionActions = ({ record }: { record: Transaction }) => {
	const dispatch = useDispatch();

	const handleShowDetails = () => {
		dispatch(
			openDrawer({
				title: 'Transacción',
				content: DrawerContent.transactionDetails,
				dataToEdit: record
			})
		);
	};

	return <TableActions onShowDetails={handleShowDetails} />;
};

export default TransactionActions;
