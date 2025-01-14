import {
	Button,
	Col,
	DatePicker,
	Divider,
	Form,
	Input,
	Row,
	Select
} from 'antd';
import { CUSTOMER_INPUTS_PROPS, FOOTER_PRODUCTS_INPUTS_PROPS } from '../consts';
import ProductFormList from '../ProductFormList';
import CalculationInputs from '../CalculationInputs';
import useForm from '@/hooks/useForm';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

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
				dueDate: moment(fieldsData?.dueDate) ?? undefined,
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
				status: 'PENDING',
				shipping: 0,
				subtotal: 0,
				iva: 0,
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
					<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
						{CUSTOMER_INPUTS_PROPS.map((item, i) => (
							<Col key={`${item.name}-${i}`} xs={24} sm={12} lg={8}>
								<Form.Item
									name={item.name}
									label={item.label}
									rules={[
										{
											required: true,
											message: item.ruleMsg
										}
									]}
								>
									<Input placeholder={item.placeholder} />
								</Form.Item>
							</Col>
						))}
					</Row>
				</>
			) : null}

			<Divider orientation='left'>Productos</Divider>
			<ProductFormList
				form={form}
				updateCalculations={updateCalculations}
				itemsError={itemsError}
				setItemsError={setItemsError}
			/>

			<div className='flex items-start gap-2 min-[1144px]:me-[36px] mt-8 overflow-x-auto custom-scrollbar'>
				{FOOTER_PRODUCTS_INPUTS_PROPS.map((item, index) => {
					return (
						<div
							key={index}
							style={{
								width: item.width,
								minWidth: item.minWidth
							}}
						>
							{index === 0 ? (
								<>
									<Form.Item name='status' label='Estado' layout='horizontal'>
										<Select
											options={[
												{ value: 'PENDING', label: 'Por pagar' },
												{ value: 'ACCEPTED', label: 'Aceptada' },
												{ value: 'REVISION', label: 'En revisión' }
											]}
										/>
									</Form.Item>
									<Form.Item
										name='dueDate'
										label='Vencimiento'
										layout='horizontal'
									>
										<DatePicker
											style={{ width: '100%' }}
											placeholder='Seleccione una fecha...'
										/>
									</Form.Item>
								</>
							) : index === 5 ? (
								<CalculationInputs updateCalculations={updateCalculations} />
							) : null}
						</div>
					);
				})}
			</div>

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
