import useForm from '@/hooks/useForm';
import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import FormButtons from '../../common/FormButtons';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '@/reducers/products/productSlice';
import { ProductServices } from '@/services/productServices';

const ProductVariantForm = () => {
	const { form, isLoading, submitAddProductVariant } = useForm();
	const { products } = useSelector((state: RootState) => state.product);
	const dispatch = useDispatch();

	const fetchProducts = async () => {
		const data = await ProductServices.getAllProducts();
		dispatch(getProducts(data));
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<Form
			layout='vertical'
			form={form}
			name='form_in_modal'
			initialValues={{ modifier: 'public' }}
			clearOnDestroy
			onFinish={values =>
				submitAddProductVariant({ name: values.name }, values.productId)
			}
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
				>
					{products?.length > 0
						? products.map(product => (
								<Select.Option key={product.id} value={product.id}>
									{product.name}
								</Select.Option>
							))
						: null}
				</Select>
			</Form.Item>
			<Form.Item
				name='name'
				label='Presentación'
				rules={[
					{
						required: true,
						message: 'La presentación del producto es requerida'
					}
				]}
			>
				<Input placeholder='Ingresa el nombre de la presentación' />
			</Form.Item>

			<FormButtons isLoading={isLoading} />
		</Form>
	);
};

export default ProductVariantForm;
