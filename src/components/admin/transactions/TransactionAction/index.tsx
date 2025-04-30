import TableActions from '../../common/ui/TableActions';
import { useDrawerStore } from '@/stores/drawerStore';
import { DrawerContent } from '@/types/enums';

const TransactionActions = ({ record }: { record: Transaction }) => {
	const { openDrawer } = useDrawerStore.getState();

	const handleShowDetails = () => {
		openDrawer({
			title: 'Transacción',
			content: DrawerContent.transactionDetails,
			dataToHandle: record
		});
	};

	return <TableActions onShowDetails={handleShowDetails} />;
};

export default TransactionActions;
