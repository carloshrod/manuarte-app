import { useEffect, useState } from 'react';
import { Form, Input, Select, Switch } from 'antd';
import { useSelector } from 'react-redux';
import ProductVariantsInputList from '../ProductVariantsInputList';
import FormButtons from '../../common/FormButtons';
import useForm from '@/hooks/useForm';

const ProductForm = () => {
	const { form, isLoading, submitCreateProduct, submitUpdateProduct } =
		useForm();
	const { productCategories } = useSelector(
		(state: RootState) => state.product
	);
	const {
		modal: { dataToEdit }
	} = useSelector((state: RootState) => state.ui);
	const isUpdating = Boolean(dataToEdit);
	const [editGeneralProduct, setEditGeneralProduct] = useState(false);

	useEffect(() => {
		if (dataToEdit) {
			const preparedFields = {
				name: dataToEdit.productName,
				description: dataToEdit.productDescription,
				categoryProductId: dataToEdit.categoryProductId,
				productVariants: [dataToEdit.name],
				productVariantName: dataToEdit.name
			};
			form.setFieldsValue(preparedFields);
		}
	}, [dataToEdit]);

	const onSubmit = (values: SubmitProductAttr) => {
		if (!isUpdating) {
			submitCreateProduct(values);
		} else {
			const { productVariantName, ...rest } = values ?? {};
			const valuesToUpdate = {
				...rest,
				productVariant: {
					id: dataToEdit.id,
					name: productVariantName
				}
			};
			submitUpdateProduct(valuesToUpdate, dataToEdit.productId);
		}
	};

	const onChangeSwitch = (checked: boolean) => {
		setEditGeneralProduct(checked);
	};

	const inputDisabled = isUpdating && !editGeneralProduct;

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
						onChange={onChangeSwitch}
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
					placeholder='Ingrese el nombre del producto'
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
					placeholder='Ingrese una descripción para el producto'
					disabled={inputDisabled}
				/>
			</Form.Item>
			<Form.Item
				name='categoryProductId'
				label='Categoría'
				rules={[
					{
						required: !inputDisabled,
						message: 'La categoría del producto es requerida'
					}
				]}
			>
				<Select
					allowClear
					showSearch
					filterOption={(input, option) => {
						try {
							const children = (
								option?.children as unknown as string
							)?.toLowerCase();

							return children?.includes(input.toLowerCase());
						} catch (error) {
							console.error(error);
							return false;
						}
					}}
					disabled={inputDisabled}
				>
					{productCategories.map(cat => (
						<Select.Option key={cat.id} value={cat.id}>
							{cat.name}
						</Select.Option>
					))}
				</Select>
			</Form.Item>

			{isUpdating ? (
				<Form.Item
					name='productVariantName'
					label='Presentación'
					rules={[
						{ required: true, message: 'El nombre del producto es requerido' }
					]}
				>
					<Input placeholder='Ingrese el nombre del producto' />
				</Form.Item>
			) : (
				<ProductVariantsInputList isUpdating={isUpdating} />
			)}

			<FormButtons
				label={isUpdating ? 'Editar' : undefined}
				isLoading={isLoading}
			/>
		</Form>
	);
};

export default ProductForm;
