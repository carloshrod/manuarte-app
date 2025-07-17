import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Form, Select } from 'antd';
import { useDispatch } from 'react-redux';
import FormButtons from '../../ui/FormButtons';
import useForm from '@/hooks/useForm';
import {
	BILLING_STATUS_OPTIONS,
	COL_PAYMENT_METHOD_OPTIONS,
	ECU_PAYMENT_METHOD_OPTIONS
} from '@/components/admin/consts';
import { quoteServices } from '@/services/quoteServices';
import { useModalStore } from '@/stores/modalStore';
import { billingServices } from '@/services/billingServices';
import { setBillings } from '@/reducers/billings/billingSlice';
import { formatToTitleCase } from '@/utils/formats';
import { ROUTES } from '@/utils/routes';
import { BillingStatus, DiscountType, ModalContent } from '@/types/enums';
import { v4 as uuidv4 } from 'uuid';
import PaymentAmounts from '../PaymentAmounts';
import CalculationInputs from '../CalculationInputs';
import {
	calculateTotalPayment,
	updateCalculations
} from '@/components/admin/utils';

const BillingModalForm = () => {
	const { form, isLoading, submitCreateBilling, submitUpdateBilling } =
		useForm();
	const { content, dataToHandle, openModal, closeModal } =
		useModalStore.getState();
	const params = useParams();
	const { push } = useRouter();
	const dispatch = useDispatch();

	const isPaid = dataToHandle?.status === BillingStatus.PAID;
	const isPartialPayment =
		content === ModalContent.billingsPartialPayment ||
		dataToHandle?.status === BillingStatus.PARTIAL_PAYMENT;

	useEffect(() => {
		if (dataToHandle?.isUpdating) {
			form.setFieldsValue({
				status: dataToHandle?.status,
				selectedMethods: dataToHandle?.paymentMethods
			});
		}

		form.setFieldsValue({
			items: dataToHandle?.items?.map((item: QuoteItem) => {
				return {
					...item,
					currency: dataToHandle.currency,
					price: Number(item.price),
					totalPrice: Number(item.totalPrice)
				};
			}),
			discount: dataToHandle?.discount,
			discountType: dataToHandle?.discountType,
			shipping: dataToHandle?.shipping
		});

		const discountByPercent =
			dataToHandle?.discountType === DiscountType.PERCENTAGE;
		updateCalculations(form, discountByPercent, dataToHandle?.subtotal);
	}, []);

	const subtotal = dataToHandle?.items?.reduce(
		(acc: number, item: QuoteItem) => {
			return acc + Number(item.totalPrice);
		},
		0
	);

	const customerName = dataToHandle?.fullName
		? `${formatToTitleCase(dataToHandle?.fullName)} - ${dataToHandle?.dni}`
		: 'Consumidor Final';

	const onFinish = async (values: SubmitBillingDto) => {
		if (!dataToHandle?.isUpdating) {
			openModal({
				title: '',
				content: ModalContent.confirm,
				componentProps: {
					confirmTitle: `¿Estás seguro de que quieres generar esta factura${
						values?.status === BillingStatus.PARTIAL_PAYMENT
							? ' como venta bajo pedido/abono?'
							: '?'
					}`,
					confirmText: `${
						values?.status === BillingStatus.PAID
							? 'Se descontarán del stock los items agregados'
							: 'No se descontarán del stock los items agregados, hasta que el pago esté completo'
					}`,
					onConfirm: async () => {
						const res = await submitCreateBilling({
							values: {
								...dataToHandle,
								...values,
								subtotal,
								shopSlug: params?.shopSlug,
								clientRequestId: uuidv4()
							},
							fetchBillings: async () => {
								const data = await billingServices.getAll(
									params?.shopSlug as string
								);
								dispatch(setBillings(data));
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
			const totalPayment = calculateTotalPayment(values?.payments);
			const paymentCompleted = totalPayment === values?.total;

			openModal({
				title: '',
				content: ModalContent.confirm,
				componentProps: {
					confirmTitle: `¿Estás seguro de que quieres ${
						isPaid
							? 'editar'
							: `${paymentCompleted ? 'generar' : 'generar un abono a'}`
					} la factura ${dataToHandle?.serialNumber}?`,
					confirmText: `${
						isPaid
							? ''
							: paymentCompleted
								? 'Se descontarán del stock los items agregados'
								: 'No se descontarán del stock los items agregados, hasta que el pago esté completo'
					}`,
					onConfirm: async () =>
						await submitUpdateBilling(
							{
								status: paymentCompleted ? BillingStatus.PAID : values?.status,
								payments: values?.payments,
								stockId: dataToHandle?.stockId,
								items: dataToHandle?.items
							},
							dataToHandle.id
						)
				}
			});
		}
	};

	const paymentMethodOptions = !params?.shopSlug?.includes('quito')
		? COL_PAYMENT_METHOD_OPTIONS
		: ECU_PAYMENT_METHOD_OPTIONS;

	return (
		<Form
			layout='vertical'
			form={form}
			name='form_in_modal'
			initialValues={{
				status: isPartialPayment
					? BillingStatus.PARTIAL_PAYMENT
					: BillingStatus.PAID
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

			<div className='flex gap-4'>
				<Form.Item
					name='selectedMethods'
					label='Métodos de Pago'
					rules={[
						{
							required: true,
							message: 'Al menos un método de pago es requerido'
						}
					]}
					style={{ width: '60%' }}
				>
					<Select
						mode='multiple'
						maxCount={3}
						placeholder='Seleccione hasta 3 métodos de pago...'
						options={paymentMethodOptions}
					/>
				</Form.Item>

				<Form.Item
					name='status'
					label='Estado'
					rules={[
						{
							required: true,
							message: 'El estado de la factura es requerido'
						}
					]}
					style={{ width: '40%' }}
					className='custom-disabled-select'
				>
					<Select options={BILLING_STATUS_OPTIONS} disabled={true} />
				</Form.Item>
			</div>

			<div className='flex gap-6'>
				<div className='w-[50%] pt-[6px]'>
					<PaymentAmounts
						form={form}
						paymentMethodOptions={paymentMethodOptions}
					/>
				</div>

				<CalculationInputs
					form={form}
					discountType={dataToHandle?.discountType}
					isUpdatingBilling={dataToHandle?.isUpdating}
				/>
			</div>

			<FormButtons
				label={dataToHandle?.isUpdating && isPaid ? 'Editar' : 'Generar'}
				isLoading={isLoading}
				onSubmit={() => form.submit()}
			/>
		</Form>
	);
};

export default BillingModalForm;
