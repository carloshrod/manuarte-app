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

const QuoteForm = () => {
	const { form } = useForm();
	const IVA_RATE = 0.19;

	const updateCalculations = () => {
		const products: ProductVariantWithStock[] =
			form.getFieldValue('products') || [];
		const shipping = parseFloat(form.getFieldValue('shipping')) || 0;

		const subtotal = products.reduce((total, item) => {
			const totalPrice = item?.totalPrice || 0;
			return Number(total) + Number(totalPrice);
		}, 0);

		const iva = subtotal * IVA_RATE || 0;
		const total = subtotal + iva || 0;

		form.setFieldsValue({
			subtotal,
			iva,
			total: total + shipping
		});
	};

	return (
		<Form
			form={form}
			layout='vertical'
			initialValues={{
				products: [],
				status: { value: 'PENDING', label: 'Por pagar' },
				shipping: 1000,
				subtotal: 0,
				iva: 0,
				total: 0
			}}
			style={{ padding: '0 16px' }}
		>
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

			<Divider orientation='left'>Productos</Divider>
			<ProductFormList form={form} updateCalculations={updateCalculations} />

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
								<div>
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
								</div>
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
					// loading={isLoading}
					// disabled={disabled}
				>
					CREAR
				</Button>
			</div>
		</Form>
	);
};

export default QuoteForm;
