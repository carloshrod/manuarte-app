import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button, Divider, Form } from 'antd';
import { useSelector } from 'react-redux';
import CustomerInfoInputs from '../../common/input-data/CustomerInfoInputs';
import ProductFormList from '../../common/input-data/ProductFormList';
import DrawerFormFooter from '../../common/input-data/DrawerFormFooter';
import CalculationInputs from '../../common/input-data/CalculationInputs';
import useForm from '@/hooks/useForm';
import { QuoteStatus } from '@/types/enums';
import { customerSchema, validateForm } from '@/utils/validators';

const QuoteForm = () => {
	const {
		form,
		isLoading,
		itemsError,
		setItemsError,
		submitCreateQuote,
		submitUpdateQuote
	} = useForm();
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
			updateCalculations();
		} else {
			if (existingCustomer?.personId) {
				form.setFieldsValue(existingCustomer);
			}
		}
	}, [existingCustomer]);

	const updateCalculations = () => {
		const items: ProductVariantWithStock[] = form.getFieldValue('items') || [];
		const shipping = parseFloat(form.getFieldValue('shipping')) || 0;

		const subtotal = items.reduce((total, item) => {
			const totalPrice = item?.totalPrice || 0;
			return Number(total) + Number(totalPrice);
		}, 0);

		form.setFieldsValue({
			subtotal,
			total: subtotal + shipping
		});
	};

	const onSubmit = async (values: SubmitQuoteDto) => {
		const isValid = !noCustomer
			? await validateForm(values, customerSchema, form)
			: true;
		if (!isValid) return;

		const { subtotal, total, ...restValues } = values;
		if (!dataToEdit) {
			await submitCreateQuote({
				...restValues,
				shopSlug: params?.shopSlug as string,
				customerId: (existingCustomer as ExistingCustomer)?.customerId
			});
		} else {
			submitUpdateQuote(
				{
					...restValues,
					shopSlug: params?.shopSlug as string,
					personId: existingCustomer?.personId || dataToEdit?.personId,
					customerId: existingCustomer?.customerId || dataToEdit?.customerId
				},
				dataToEdit.id
			);
		}
	};

	return (
		<Form
			form={form}
			layout='vertical'
			initialValues={{
				items: [],
				status: QuoteStatus.PENDING,
				subtotal: 0,
				shipping: 0,
				total: 0
			}}
			style={{ padding: '0 16px' }}
			onFinish={values => onSubmit(values)}
		>
			{!noCustomer ? (
				<>
					<Divider orientation='left' style={{ marginTop: 0 }}>
						Datos del Cliente
					</Divider>
					<CustomerInfoInputs />
				</>
			) : null}

			<Divider orientation='left'>Productos</Divider>
			<ProductFormList
				form={form}
				itemsError={itemsError}
				setItemsError={setItemsError}
				isQuote={true}
			/>

			<DrawerFormFooter isQuote={true}>
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

export default QuoteForm;
