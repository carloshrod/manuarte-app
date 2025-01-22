import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import TableActions from '../../common/ui/TableActions';
import { billingServices } from '@/services/billingServices';
import { BillingStatus } from '@/types/enums';
import { cancelBilling } from '@/reducers/billings/billingSlice';

const BillingsActions = ({ record }: { record: Billing }) => {
	const dispatch = useDispatch();

	const handleCancel = async () => {
		try {
			const res = await billingServices.cancel(record.serialNumber);
			if (res.status === 200) {
				dispatch(cancelBilling({ ...record, status: BillingStatus.CANCELED }));
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

	const isCancelable = record.status !== BillingStatus.CANCELED;

	return (
		<TableActions
			onDelete={handleCancel}
			popTitle={`${record.serialNumber} - ${record.customerName ?? 'Consumidor final'}`}
			popDescription='¿Estás seguro de que quieres anular esta factura?'
			isDeletable={isCancelable}
		/>
	);
};

export default BillingsActions;
