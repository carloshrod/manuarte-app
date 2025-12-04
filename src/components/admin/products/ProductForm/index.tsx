import { useEffect, useState } from 'react';
import { Form, Input, Select, Switch } from 'antd';
import { useSelector } from 'react-redux';
import ProductVariantFormList from '../ProductVariantFormList';
import FormButtons from '../../common/ui/FormButtons';
import useForm from '@/hooks/useForm';
import SelectStocks from '../SelectStocks';
import { selectFilterOption } from '../../utils';
import { useModalStore } from '@/stores/modalStore';
import { useSearchParams } from 'next/navigation';

const ProductForm = () => {
	const {
		form,
		isLoading,
		submitCreateProduct,
		submitUpdateProduct,
		submitUpdateProductVariant
	} = useForm();
	const { productCategories } = useSelector(
		(state: RootState) => state.productCategory
	);
	const { shops } = useSelector((state: RootState) => state.shop);
	const { dataToHandle } = useModalStore.getState();
	const isUpdating = Boolean(dataToHandle);
	const [editGeneralProduct, setEditGeneralProduct] = useState(false);
	const [active, setActive] = useState(dataToHandle?.active ?? false);
	const [isQuitoSelected, setIsQuitoSelected] = useState(true);
	const searchParams = useSearchParams();
	const activeProducts = searchParams.get('showActiveOnly') === 'true';

	useEffect(() => {
		if (dataToHandle) {
			const preparedFields = {
				name: dataToHandle.productName,
				description: dataToHandle.productDescription,
				productCategoryId: dataToHandle.productCategoryId,
				productVariants: [dataToHandle.name],
				productVariantName: dataToHandle.name
			};
			form.setFieldsValue(preparedFields);
		}
	}, []);

	const onSubmit = (values: SubmitProductDto) => {
		if (!isUpdating) {
			const { stockIds, ...restValues } = values;

			const cleanedValues = isQuitoSelected
				? restValues
				: {
						...restValues,
						productVariants:
							restValues?.productVariants &&
							restValues?.productVariants.map(
								({ priceUsd, costUsd, ...rest }) => rest
							)
					};

			const stocks = shops
				.filter(shop => stockIds?.includes(shop.stockId))
				.map(filtShop => {
					return { id: filtShop.stockId, currency: filtShop.currency };
				});

			submitCreateProduct({ ...cleanedValues, stocks });
		} else {
			const { productVariantName, productCategoryId, ...rest } = values ?? {};
			const valuesToUpdate = {
				...rest,
				productVariant: {
					id: dataToHandle.id,
					name: productVariantName,
					active
				}
			};
			if (editGeneralProduct) {
				submitUpdateProduct(valuesToUpdate, dataToHandle.productId);
			} else {
				submitUpdateProductVariant(
					valuesToUpdate,
					dataToHandle.id,
					activeProducts
				);
			}
		}
	};

	const inputDisabled = isUpdating && !editGeneralProduct;

	const pCategoryOptions = productCategories?.map(pCat => {
		return {
			value: pCat.id,
			label: pCat.name
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
			{isUpdating ? (
				<div className='flex gap-2 my-6 px-2 text-gray-500'>
					<Switch
						defaultChecked={false}
						onChange={checked => setEditGeneralProduct(checked)}
						id='switch'
					/>
					<label htmlFor='switch'>
						Editar información general del producto
					</label>
				</div>
			) : null}

			<Form.Item
				name='name'
				label='Nombre'
				rules={[
					{
						required: !inputDisabled,
						message: 'El nombre del producto es requerido'
					}
				]}
			>
				<Input
					placeholder='Ingresa el nombre del producto'
					disabled={inputDisabled}
				/>
			</Form.Item>
			<Form.Item
				name='description'
				label='Descripción'
				rules={[
					{
						required: !inputDisabled,
						message: 'La descripción del producto es requerida'
					}
				]}
			>
				<Input.TextArea
					placeholder='Ingresa una descripción para el producto'
					disabled={inputDisabled}
				/>
			</Form.Item>
			<Form.Item
				name='productCategoryId'
				label='Categoría'
				rules={[
					{
						required: !isUpdating,
						message: 'La categoría del producto es requerida'
					}
				]}
			>
				<Select
					placeholder='Selecciona una categoría'
					allowClear
					showSearch
					filterOption={selectFilterOption}
					options={pCategoryOptions}
					disabled={isUpdating}
				/>
			</Form.Item>

			{isUpdating ? null : (
				<SelectStocks form={form} setIsQuitoSelected={setIsQuitoSelected} />
			)}

			{isUpdating ? (
				<div className='flex items-center gap-4'>
					<Form.Item
						name='productVariantName'
						label='Presentación'
						rules={[
							{ required: true, message: 'El nombre del producto es requerido' }
						]}
						className='flex-1'
					>
						<Input placeholder='Ingresa el nombre del producto' />
					</Form.Item>

					<div className='flex-1 flex items-center gap-2 my-6 px-2'>
						<Switch
							defaultChecked={false}
							onChange={checked => setActive(checked)}
							id='active'
							style={active ? { backgroundColor: '#10b981' } : {}}
							checked={active}
						/>
						<label htmlFor='active'>{active ? 'Activo' : 'Inactivo'}</label>
					</div>
				</div>
			) : (
				<Form.Item
					name='productVariants'
					rules={[
						{
							validator: async (_, value) => {
								if (!value || value.length === 0) {
									return Promise.reject(
										new Error('Debe haber al menos 1 presentación')
									);
								}
							}
						}
					]}
				>
					<ProductVariantFormList
						isUpdating={isUpdating}
						isQuitoSelected={isQuitoSelected}
					/>
				</Form.Item>
			)}

			<FormButtons
				label={isUpdating ? 'Editar' : undefined}
				isLoading={isLoading}
			/>
		</Form>
	);
};

export default ProductForm;
