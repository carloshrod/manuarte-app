import { useParams } from 'next/navigation';
import TableActions from '../../common/ui/TableActions';
import { useDispatch } from 'react-redux';
import { DrawerContent } from '@/types/enums';
import { AxiosError } from 'axios';
import { notification } from 'antd';
import { quoteServices } from '@/services/quoteServices';
import { removeQuote } from '@/reducers/quotes/quoteSlice';
import { useDrawerStore } from '@/stores/drawerStore';

const QuotesActions = ({ record }: { record: Quote }) => {
	const { openDrawer } = useDrawerStore.getState();
	const dispatch = useDispatch();
	const params = useParams();
	const shopName =
		typeof params.shopSlug === 'string'
			? params.shopSlug.toUpperCase().replace('-', ' ')
			: '';

	const handleEdit = async () => {
		const dataToHandle = await quoteServices.getOne({
			serialNumber: record.serialNumber,
			server: false
		});

		openDrawer({
			title: `Editar Cotización ${record.serialNumber} - ${shopName}`,
			content: DrawerContent.quotes,
			dataToHandle,
			noCustomer: Boolean(!dataToHandle?.customerId)
		});
	};

	const handleDelete = async () => {
		try {
			const res = await quoteServices.delete(record.id);
			if (res.status === 200) {
				dispatch(removeQuote(record.id));
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
			popTitle={`${record.serialNumber} - ${record.customerName ?? 'Consumidor final'}`}
		/>
	);
};

export default QuotesActions;
