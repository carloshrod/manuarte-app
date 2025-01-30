import useForm from '@/hooks/useForm';
import { Button, Divider, Form } from 'antd';
import { useSelector } from 'react-redux';
import CustomerInfoInputs from '../../common/input-data/CustomerInfoInputs';
import ProductFormList from '../../common/input-data/ProductFormList';
import DrawerFormFooter from '../../common/input-data/DrawerFormFooter';
import CalculationInputs from '../../common/input-data/CalculationInputs';
import { useEffect } from 'react';
import { updateCalculations } from '../../utils';
import { useParams } from 'next/navigation';

const BillingForm = () => {
	const { form, isLoading, itemsError, setItemsError, submitCreateBilling } =
		useForm();
	const {
		drawer: { dataToEdit, customerInfo: existingCustomer, noCustomer }
	} = useSelector((state: RootState) => state.ui);
	const params = useParams() ?? {};

	useEffect(() => {
		if (dataToEdit) {
			let fieldsData = dataToEdit;

			if (existingCustomer?.personId) {
				fieldsData = { ...dataToEdit, ...existingCustomer };
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

	const onSubmit = async (values: SubmitBillingDto) => {
		const { subtotal, ...restValues } = values;

		await submitCreateBilling({
			values: {
				...restValues,
				shopSlug: params?.shopSlug as string,
				customerId: (existingCustomer as ExistingCustomer)?.customerId
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
				shipping: 0,
				total: 0
			}}
			style={{ padding: '0 16px' }}
			onFinish={values => onSubmit(values)}
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
					htmlType='submit'
					loading={isLoading}
				>
					{!dataToEdit ? 'CREAR' : 'EDITAR'}
				</Button>
			</div>
		</Form>
	);
};

export default BillingForm;
