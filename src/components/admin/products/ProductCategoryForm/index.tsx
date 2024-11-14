import { Form, Input } from 'antd';
import FormButtons from '../../common/FormButtons';
import useForm from '@/hooks/useForm';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProductCategoryForm = () => {
	const {
		form,
		isLoading,
		submitCreateProductCategory,
		submitUpdateProductCategory
	} = useForm();
	const {
		modal: { dataToEdit }
	} = useSelector((state: RootState) => state.ui);

	useEffect(() => {
		if (dataToEdit) {
			form.setFieldsValue({ name: dataToEdit.name });
		}
	}, []);

	const handleSubmit = async (values: { name: string }) => {
		if (!dataToEdit) {
			submitCreateProductCategory(values);
		} else {
			submitUpdateProductCategory(values, dataToEdit.id);
		}
	};

	return (
		<Form
			layout='vertical'
			form={form}
			name='form_in_modal'
			initialValues={{ modifier: 'public' }}
			clearOnDestroy
			onFinish={values => handleSubmit(values)}
		>
			<Form.Item
				name='name'
				label='Categoría'
				rules={[
					{
						required: true,
						message: 'El nombre de la categoría es requerido'
					}
				]}
			>
				<Input placeholder='Ingresa el nombre de la categoría' />
			</Form.Item>

			<FormButtons isLoading={isLoading} />
		</Form>
	);
};

export default ProductCategoryForm;
