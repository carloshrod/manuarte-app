import { useParams, useRouter } from 'next/navigation';
import { Form, Select } from 'antd';
import { useSelector } from 'react-redux';
import FormButtons from '../../ui/FormButtons';
import useForm from '@/hooks/useForm';
import {
	billingStatusOptions,
	paymentMethodOptions
} from '@/components/admin/consts';
import { formatToTitleCase } from '@/utils/utils';
import { ROUTES } from '@/utils/routes';
import { BillingStatus, PaymentMethod } from '@/types/enums';
import { useEffect } from 'react';

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
				status: BillingStatus.PAID,
				paymentMethod: PaymentMethod.CASH
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

			<Form.Item name='status' label='Estado'>
				<Select options={billingStatusOptions} />
			</Form.Item>
			<Form.Item name='paymentMethod' label='Método de Pago'>
				<Select options={paymentMethodOptions} />
			</Form.Item>

			<FormButtons
				label={dataToEdit?.isUpdating ? 'Editar' : 'Generar'}
				isLoading={isLoading}
			/>
		</Form>
	);
};

export default BillingModalForm;
