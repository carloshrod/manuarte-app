import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Form, Select } from 'antd';
import FormButtons from '../../ui/FormButtons';
import useForm from '@/hooks/useForm';
import {
	BILLING_STATUS_OPTIONS,
	COL_PAYMENT_METHOD_OPTIONS,
	ECU_PAYMENT_METHOD_OPTIONS
} from '@/components/admin/consts';
import { formatToTitleCase } from '@/utils/formats';
import { ROUTES } from '@/utils/routes';
import { BillingStatus, ModalContent } from '@/types/enums';
import { quoteServices } from '@/services/quoteServices';
import { useModalStore } from '@/stores/modalStore';

const BillingModalForm = () => {
	const { form, isLoading, submitCreateBilling, submitUpdateBilling } =
		useForm();
	const { dataToHandle, openModal, closeModal } = useModalStore.getState();
	const params = useParams();
	const { push } = useRouter();

	useEffect(() => {
		if (dataToHandle?.isUpdating) {
			form.setFieldsValue({
				status: dataToHandle?.status,
				paymentMethod: dataToHandle?.paymentMethod
			});
		}
	}, []);

	const subtotal = dataToHandle?.items?.reduce(
		(acc: number, item: QuoteItem) => {
			return acc + Number(item.totalPrice);
		},
		0
	);

	const total = subtotal + dataToHandle?.shipping || 0;

	const customerName = dataToHandle?.fullName
		? `${formatToTitleCase(dataToHandle?.fullName)} - ${dataToHandle?.dni}`
		: 'Consumidor Final';

	const onFinish = async (values: SubmitBillingDto) => {
		if (!dataToHandle?.isUpdating) {
			openModal({
				title: '',
				content: ModalContent.confirm,
				componentProps: {
					confirmTitle: '¿Estás seguro de que quieres generar esta factura?',
					confirmText:
						'Se descontarán del stock las cantidades para los items agregados',
					onConfirm: async () => {
						const res = await submitCreateBilling({
							values: {
								...dataToHandle,
								...values,
								total,
								shopSlug: params?.shopSlug
							}
						});

						if (res?.status === 201) {
							const quoteId = dataToHandle.id;
							await quoteServices.delete(quoteId);
							push(`${ROUTES.BILLING_SHOPS}/${params?.shopSlug}`);
						} else {
							closeModal();
						}
					}
				}
			});
		} else {
			submitUpdateBilling(values, dataToHandle.id);
		}
	};

	return (
		<Form
			layout='vertical'
			form={form}
			name='form_in_modal'
			initialValues={{
				status: BillingStatus.PAID
			}}
			onFinish={onFinish}
		>
			<div className='flex flex-col gap-4 py-6'>
				{dataToHandle?.isUpdating ? (
					<div className='px-4'>
						<span className='font-semibold me-2'>Serial:</span>{' '}
						<span className='px-3 py-1 rounded bg-[#e5e5e5]'>
							{dataToHandle?.serialNumber}
						</span>
					</div>
				) : null}
				<div className='px-4'>
					<span className='font-semibold me-2'>Cliente:</span>{' '}
					<span className='px-3 py-1 rounded bg-[#e5e5e5]'>{customerName}</span>
				</div>
			</div>

			<Form.Item
				name='status'
				label='Estado'
				rules={[
					{
						required: true,
						message: 'El estado de la factura es requerido'
					}
				]}
			>
				<Select options={BILLING_STATUS_OPTIONS} />
			</Form.Item>
			<Form.Item
				name='paymentMethod'
				label='Método de Pago'
				rules={[
					{
						required: true,
						message: 'El método de pago es requerido'
					}
				]}
			>
				<Select
					options={
						!params?.shopSlug?.includes('quito')
							? COL_PAYMENT_METHOD_OPTIONS
							: ECU_PAYMENT_METHOD_OPTIONS
					}
				/>
			</Form.Item>

			<FormButtons
				label={dataToHandle?.isUpdating ? 'Editar' : 'Generar'}
				isLoading={isLoading}
				onSubmit={() => form.submit()}
			/>
		</Form>
	);
};

export default BillingModalForm;
