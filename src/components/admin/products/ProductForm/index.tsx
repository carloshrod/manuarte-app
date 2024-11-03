import { Form, Input, Select } from 'antd';
import ProductVariantsInputList from '../ProductVariantsInputList';

const ProductForm = () => {
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
				<Select>
					<Select.Option value='cat1'>Categoría 1</Select.Option>
					<Select.Option value='cat2'>Categoría 2</Select.Option>
					<Select.Option value='cat3'>Categoría 3</Select.Option>
				</Select>
			</Form.Item>

			{/* Presentaciones del producto  */}
			<ProductVariantsInputList />
		</>
	);
};

export default ProductForm;
