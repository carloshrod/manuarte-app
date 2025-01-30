import { useParams, useRouter } from 'next/navigation';
import { Form, Select } from 'antd';
import { useSelector } from 'react-redux';
import FormButtons from '../../ui/FormButtons';
import useForm from '@/hooks/useForm';
import {
	BILLING_STATUS_OPTIONS,
	COL_PAYMENT_METHOD_OPTIONS,
	ECU_PAYMENT_METHOD_OPTIONS
} from '@/components/admin/consts';
import { formatToTitleCase } from '@/utils/utils';
import { ROUTES } from '@/utils/routes';
import { BillingStatus } from '@/types/enums';
import { useEffect } from 'react';
import { quoteServices } from '@/services/quoteServices';

const BillingModalForm = () => {
	const { form, isLoading, submitCreateBilling, submitUpdateBilling } =
		useForm();
	const {
		modal: { dataToEdit }
	} = useSelector((state: RootState) => state.ui);
	const params = useParams();
	const { push } = useRouter();

	useEffect(() => {
		if (dataToEdit?.isUpdating) {
			form.setFieldsValue({
				status: dataToEdit?.status,
				paymentMethod: dataToEdit?.paymentMethod
			});
		}
	}, []);

	const subtotal = dataToEdit?.items?.reduce((acc: number, item: QuoteItem) => {
		return acc + Number(item.totalPrice);
	}, 0);

	const total = subtotal + dataToEdit?.shipping || 0;

	const customerName = dataToEdit?.fullName
		? `${formatToTitleCase(dataToEdit?.fullName)} - ${dataToEdit?.dni}`
		: 'Consumidor Final';

	const onSubmit = async (values: SubmitBillingDto) => {
		if (!dataToEdit?.isUpdating) {
			const res = await submitCreateBilling({
				values: {
					...dataToEdit,
					...values,
					total,
					shopSlug: params?.shopSlug
				},
				modal: true
			});
			if (res?.status === 201) {
				const quoteId = dataToEdit.id;
				await quoteServices.delete(quoteId);
				push(`${ROUTES.BILLING_SHOPS}/${params?.shopSlug}`);
			}
		} else {
			submitUpdateBilling(values, dataToEdit.id);
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
			onFinish={values => onSubmit(values)}
		>
			<div className='flex flex-col gap-4 py-6'>
				{dataToEdit?.isUpdating ? (
					<div className='px-4'>
						<span className='font-semibold me-2'>Serial:</span>{' '}
						<span className='px-3 py-1 rounded bg-[#e5e5e5]'>
							{dataToEdit?.serialNumber}
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
				label={dataToEdit?.isUpdating ? 'Editar' : 'Generar'}
				isLoading={isLoading}
			/>
		</Form>
	);
};

export default BillingModalForm;
