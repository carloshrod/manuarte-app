import { useEffect } from 'react';
import { Form, Input } from 'antd';
import FormButtons from '../../common/ui/FormButtons';
import useForm from '@/hooks/useForm';
import { useModalStore } from '@/stores/modalStore';

const ProductCategoryForm = () => {
	const {
		form,
		isLoading,
		submitCreateProductCategory,
		submitUpdateProductCategory
	} = useForm();
	const { dataToHandle } = useModalStore.getState();

	useEffect(() => {
		if (dataToHandle) {
			form.setFieldsValue({ name: dataToHandle.name });
		}
	}, []);

	const handleSubmit = async (values: { name: string }) => {
		if (!dataToHandle) {
			submitCreateProductCategory(values);
		} else {
			submitUpdateProductCategory(values, dataToHandle.id);
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

			<FormButtons
				label={dataToHandle ? 'Editar' : undefined}
				isLoading={isLoading}
			/>
		</Form>
	);
};

export default ProductCategoryForm;
