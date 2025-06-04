import useForm from '@/hooks/useForm';
import { Button, Divider, Form } from 'antd';
import CustomerInfoInputs from '../../common/input-data/CustomerInfoInputs';
import ProductFormList from '../../common/input-data/ProductFormList';
import DrawerFormFooter from '../../common/input-data/DrawerFormFooter';
import CalculationInputs from '../../common/input-data/CalculationInputs';
import { useEffect, useState } from 'react';
import { updateCalculations } from '../../utils';
import { useParams } from 'next/navigation';
import { customerSchema, validateForm } from '@/utils/validators';
import { useModalStore } from '@/stores/modalStore';
import { ModalContent } from '@/types/enums';
import { useDrawerStore } from '@/stores/drawerStore';
import { v4 as uuidv4 } from 'uuid';

const BillingForm = () => {
	const { form, itemsError, setItemsError, submitCreateBilling } = useForm();
	const {
		dataToHandle,
		customerInfo: existingCustomer,
		noCustomer
	} = useDrawerStore.getState();
	const params = useParams() ?? {};
	const { openModal } = useModalStore.getState();
	const [clientRequestId, setClientRequestId] = useState<string>('');

	useEffect(() => {
		if (dataToHandle) {
			let fieldsData = dataToHandle;

			if (existingCustomer?.personId) {
				fieldsData = { ...dataToHandle, ...existingCustomer };
			}

			const preparedFields = {
				...fieldsData,
				items: fieldsData?.items?.map((item: QuoteItem) => {
					return {
						...item,
						currency: fieldsData.currency,
						price: Number(item.price),
						totalPrice: Number(item.totalPrice)
					};
				}),
				shipping: fieldsData.shipping ?? 0
			};
			form.setFieldsValue(preparedFields);
			updateCalculations(form);
		} else {
			if (existingCustomer?.personId) {
				form.setFieldsValue(existingCustomer);
			}
		}
	}, [existingCustomer]);

	const onFinish = async (values: SubmitBillingDto) => {
		if (values?.items?.length < 1) {
			setItemsError(true);
			return;
		}

		const isValid = !noCustomer
			? await validateForm(values, customerSchema, form)
			: true;
		if (!isValid) return;

		const { subtotal, ...restValues } = values;

		let uniqueId: string = clientRequestId;
		if (!clientRequestId) {
			uniqueId = uuidv4();
			setClientRequestId(uniqueId);
		}

		openModal({
			title: '',
			content: ModalContent.confirm,
			componentProps: {
				confirmTitle: '¿Estás seguro de que quieres generar esta factura?',
				confirmText:
					'Se descontarán del stock las cantidades para los items agregados',
				onConfirm: async () => {
					await submitCreateBilling({
						values: {
							...restValues,
							shopSlug: params?.shopSlug as string,
							personId: existingCustomer?.personId || dataToHandle?.personId,
							customerId: existingCustomer?.customerId as string,
							clientRequestId: uniqueId
						}
					});
				}
			}
		});
	};

	return (
		<Form
			form={form}
			layout='vertical'
			initialValues={{
				items: [],
				status: 'PAID',
				subtotal: 0,
				total: 0
			}}
			style={{ padding: '0 16px' }}
			onFinish={onFinish}
		>
			{!noCustomer ? <CustomerInfoInputs /> : null}

			<Divider orientation='left'>Productos</Divider>
			<ProductFormList
				form={form}
				itemsError={itemsError}
				setItemsError={setItemsError}
				isQuote={false}
			/>

			<DrawerFormFooter isQuote={false} shopSlug={params?.shopSlug as string}>
				<CalculationInputs form={form} />
			</DrawerFormFooter>

			<div className='flex justify-end mt-4'>
				<Button
					type='primary'
					className='w-[90%] max-w-[250px]'
					style={{ fontWeight: 600 }}
					onClick={() => form.submit()}
				>
					GENERAR
				</Button>
			</div>
		</Form>
	);
};

export default BillingForm;
