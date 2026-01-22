import { useEffect, useState } from 'react';
import { Divider, Form, Input, InputNumber, Select } from 'antd';
import { useSelector } from 'react-redux';
import FormButtons from '../../common/ui/FormButtons';
import SelectStocks from '../SelectStocks';
import useProductServices from '@/services/product';
import useForm from '@/hooks/useForm';
import { formatInputCurrency } from '@/utils/formats';
import { selectFilterOption } from '../../utils';
import { PRODUCT_VARIANT_PROPS } from '../../consts';

const ProductVariantForm = () => {
	const { form, isLoading, submitAddProductVariant } = useForm();
	const { products } = useSelector((state: RootState) => state.product);
	const { shops } = useSelector((state: RootState) => state.shop);
	const [isQuitoSelected, setIsQuitoSelected] = useState(true);
	const { getProducts } = useProductServices();

	useEffect(() => {
		if (products.length > 0) return;

		getProducts();
	}, []);

	const onSubmit = (values: SubmitProductVariantDto) => {
		const { productId, priceUsd, costUsd, stockIds, ...restValues } = values;

		const cleanedValues = isQuitoSelected
			? { ...restValues, priceUsd, costUsd }
			: restValues;

		const stocks = shops
			.filter(shop => stockIds?.includes(shop.stockId))
			.map(filtShop => {
				return { id: filtShop.stockId, currency: filtShop.currency };
			});

		submitAddProductVariant({ ...cleanedValues, stocks }, productId, stockIds);
	};

	const productOptions = products?.map(p => {
		return {
			value: p.id,
			label: p.name
		};
	});

	const getFilteredInputs = () => {
		if (isQuitoSelected) {
			return PRODUCT_VARIANT_PROPS;
		}
		// Si no es Quito, filtrar campos USD
		return PRODUCT_VARIANT_PROPS.filter(
			input => !input.name.toLowerCase().includes('usd')
		);
	};

	const filteredInputs = getFilteredInputs();

	// Agrupar inputs por tipo
	const basicInputs = filteredInputs.filter(
		input => input.type === 'text' || input.name.includes('Qty')
	);
	const pvpInputs = filteredInputs.filter(input => input.priceType === 'pvp');
	const disInputs = filteredInputs.filter(input => input.priceType === 'dis');
	const costInputs = filteredInputs.filter(input =>
		input.name.includes('cost')
	);

	return (
		<Form
			layout='vertical'
			form={form}
			name='form_in_modal'
			initialValues={{ modifier: 'public' }}
			clearOnDestroy
			onFinish={values => onSubmit(values)}
		>
			<Form.Item
				name='productId'
				label='Producto'
				rules={[
					{
						required: true,
						message: 'El producto es requerido'
					}
				]}
			>
				<Select
					placeholder='Selecciona un producto'
					allowClear
					showSearch
					filterOption={selectFilterOption}
					options={productOptions}
				/>
			</Form.Item>

			<SelectStocks form={form} setIsQuitoSelected={setIsQuitoSelected} />

			<Divider orientation='left' style={{ borderColor: '#00000032' }}>
				Presentacion
			</Divider>
			<div className='flex flex-col'>
				{/* Nombre y cantidades */}
				<div className='flex flex-wrap items-center gap-x-4'>
					{basicInputs.map((input, index) => (
						<Form.Item
							key={`${input.name}-${index}`}
							name={input.name}
							label={input.label}
							validateTrigger={['onChange', 'onBlur']}
							rules={[
								{
									required: true,
									message: 'Requerido'
								}
							]}
							style={{ width: input.width }}
						>
							{input.type === 'text' ? (
								<Input placeholder={input.placeholder} />
							) : (
								<InputNumber
									min={0}
									controls={false}
									placeholder={input.placeholder}
									className='textRight'
									style={{ width: '100%' }}
								/>
							)}
						</Form.Item>
					))}
				</div>

				<div className='flex gap-4'>
					{/* Precios PVP */}
					{pvpInputs.length > 0 && (
						<div className='flex flex-wrap items-center gap-x-4 border-b-2 border-gray-200 mb-4'>
							<span className='font-semibold'>Precio de venta al público</span>
							{pvpInputs.map((input, index) => (
								<Form.Item
									key={`${input.name}-${index}`}
									name={input.name}
									label={input.label}
									validateTrigger={['onChange', 'onBlur']}
									rules={[
										{
											required: true,
											message: 'Requerido'
										}
									]}
									style={{ width: input.width }}
								>
									<InputNumber
										min={0}
										controls={false}
										placeholder={input.placeholder}
										formatter={value => formatInputCurrency(value)}
										className='textRight'
										style={{ width: '100%' }}
									/>
								</Form.Item>
							))}
						</div>
					)}

					{/* Precios DIS */}
					{disInputs.length > 0 && (
						<div className='flex flex-wrap items-center gap-x-4 border-b-2 border-gray-200 mb-4'>
							<span className='font-semibold'>Precio para distribuidores</span>
							{disInputs.map((input, index) => (
								<Form.Item
									key={`${input.name}-${index}`}
									name={input.name}
									label={input.label}
									validateTrigger={['onChange', 'onBlur']}
									style={{ width: input.width }}
								>
									<InputNumber
										min={0}
										controls={false}
										placeholder={input.placeholder}
										formatter={value => formatInputCurrency(value)}
										className='textRight'
										style={{ width: '100%' }}
									/>
								</Form.Item>
							))}
						</div>
					)}
				</div>

				{/* Costos */}
				{costInputs.length > 0 && (
					<div className='flex flex-wrap items-center gap-x-4'>
						{costInputs.map((input, index) => (
							<Form.Item
								key={`${input.name}-${index}`}
								name={input.name}
								label={input.label}
								validateTrigger={['onChange', 'onBlur']}
								rules={[
									{
										required: true,
										message: 'Requerido'
									}
								]}
								style={{ width: input.width }}
							>
								<InputNumber
									min={0}
									controls={false}
									placeholder={input.placeholder}
									formatter={value => formatInputCurrency(value)}
									className='textRight'
									style={{ width: '100%' }}
								/>
							</Form.Item>
						))}
					</div>
				)}
			</div>

			<FormButtons isLoading={isLoading} />
		</Form>
	);
};

export default ProductVariantForm;
