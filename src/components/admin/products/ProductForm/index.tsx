import { Form, Input, Select } from 'antd';
import ProductVariantsInputList from '../ProductVariantsInputList';
import { useSelector } from 'react-redux';

const ProductForm = () => {
	const { productCategories } = useSelector(
		(state: RootState) => state.product
	);

	return (
		<>
			<Form.Item
				name='name'
				label='Nombre'
				rules={[
					{ required: true, message: 'El nombre del producto es requerido' }
				]}
			>
				<Input placeholder='Ingrese el nombre del producto' />
			</Form.Item>
			<Form.Item
				name='description'
				label='Descripción'
				rules={[
					{
						required: true,
						message: 'La descripción del producto es requerida'
					}
				]}
			>
				<Input.TextArea placeholder='Ingrese una descripción para el producto' />
			</Form.Item>
			<Form.Item
				name='category'
				label='Categoría'
				rules={[
					{
						required: true,
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
				>
					{productCategories.map(cat => (
						<Select.Option key={cat.id} value={cat.id}>
							{cat.name}
						</Select.Option>
					))}
				</Select>
			</Form.Item>

			{/* Presentaciones del producto  */}
			<ProductVariantsInputList />
		</>
	);
};

export default ProductForm;
