import { notification } from 'antd';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import TableActions from '../../common/ui/TableActions';
import { billingServices } from '@/services/billingServices';
import { BillingStatus, ModalContent } from '@/types/enums';
import { cancelBilling, removeBilling } from '@/reducers/billings/billingSlice';
import { useModalStore } from '@/stores/modalStore';

const BillingsActions = ({ record }: { record: Billing }) => {
	const { openModal } = useModalStore.getState();
	const dispatch = useDispatch();

	const isPreOrder =
		record.status === BillingStatus.PARTIAL_PAYMENT ||
		record.status === BillingStatus.PENDING_DELIVERY;

	const handleEdit = async () => {
		const billing = await billingServices.getOne({
			serialNumber: record?.serialNumber
		});

		openModal({
			title: 'Editar Factura',
			content: ModalContent.billings,
			dataToHandle: {
				...billing,
				isUpdating: true
			}
		});
	};

	const handleGenerate = async ({
		title,
		content
	}: {
		title: string;
		content: ModalContent;
	}) => {
		const billing = await billingServices.getOne({
			serialNumber: record?.serialNumber
		});

		if (
			content === ModalContent.preOrder &&
			record?.status === BillingStatus.PENDING_DELIVERY
		) {
			notification.info({
				message:
					'El pedido está pendiente de entrega, genera una factura si quieres finalizarlo!'
			});
			return;
		}

		openModal({
			title,
			content,
			dataToHandle: {
				...billing,
				isUpdating: true
			}
		});
	};

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

	const handleDelete = async () => {
		try {
			const res = await billingServices.delete(record.id);
			if (res.status === 200) {
				dispatch(removeBilling(record.id));
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

	const isCancelable = record.status === BillingStatus.PAID;

	return (
		<TableActions
			onEdit={!isPreOrder ? handleEdit : undefined}
			onGenerate={isPreOrder ? handleGenerate : undefined}
			onDelete={!isCancelable ? handleDelete : undefined}
			onCancel={isCancelable ? handleCancel : undefined}
			popTitle={`${record.serialNumber} - ${record.customerName ?? 'Consumidor final'}`}
			popDescription={
				isCancelable
					? '¿Estás seguro de que quieres anular esta factura?'
					: undefined
			}
			isEditable={isCancelable || isPreOrder}
			isDeletable={isCancelable}
		/>
	);
};

export default BillingsActions;
