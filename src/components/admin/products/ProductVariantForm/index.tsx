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

		submitAddProductVariant({ ...cleanedValues, stocks }, productId);
	};

	const productOptions = products?.map(p => {
		return {
			value: p.id,
			label: p.name
		};
	});

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
			<div className='flex flex-wrap items-center gap-x-2'>
				{PRODUCT_VARIANT_PROPS.map((input, index) => {
					return input.name.toLowerCase().includes('usd') &&
						!isQuitoSelected ? null : (
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
							style={{
								width: input.width
							}}
						>
							{input.type === 'text' ? (
								<Input placeholder={input.placeholder} />
							) : (
								<InputNumber
									min={0}
									controls={false}
									placeholder={input.placeholder}
									formatter={
										index > 2 ? value => formatInputCurrency(value) : undefined
									}
									className='textRight'
									style={{ width: '100%' }}
								/>
							)}
						</Form.Item>
					);
				})}
			</div>

			<FormButtons isLoading={isLoading} />
		</Form>
	);
};

export default ProductVariantForm;
