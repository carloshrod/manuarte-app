import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from 'antd';
import useForm from '@/hooks/useForm';
import FormButtons from '../../common/FormButtons';

const CustomersForm = () => {
	const { form, isLoading, submitRegisterCustomer, submitUpdateCustomer } =
		useForm();
	const {
		modal: { dataToEdit }
	} = useSelector((state: RootState) => state.ui);

	useEffect(() => {
		if (dataToEdit) {
			form.setFieldsValue(dataToEdit);
		}
	}, []);

	const onSubmit = async (values: SubmitCustomerDto) => {
		if (!dataToEdit) {
			await submitRegisterCustomer(values);
		} else {
			await submitUpdateCustomer(values, dataToEdit.personId);
		}
	};

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
				name='fullName'
				label='Nombre'
				rules={[
					{
						required: true,
						message: 'El nombre del cliente es requerido'
					}
				]}
			>
				<Input placeholder='Ingresa el nombre completo' />
			</Form.Item>
			<Form.Item
				name='dni'
				label='Documento'
				rules={[
					{
						required: true,
						message: 'El número de documento es requerido'
					}
				]}
			>
				<Input placeholder='Ingresa el número de documento' />
			</Form.Item>
			<Form.Item
				name='email'
				label='Email'
				rules={[
					{
						required: true,
						message: 'El email es requerido'
					}
				]}
			>
				<Input placeholder='Ingresa el email del cliente' />
			</Form.Item>
			<Form.Item
				name='phoneNumber'
				label='Nro de teléfono'
				rules={[
					{
						required: true,
						message: 'El número de teléfono es requerido'
					}
				]}
			>
				<Input placeholder='Ingresa el número de teléfono del cliente' />
			</Form.Item>
			<Form.Item name='location' label='Dirección'>
				<Input placeholder='Ingresa la dirección del cliente' />
			</Form.Item>
			<Form.Item name='city' label='Ciudad'>
				<Input placeholder='Ingresa la ciudad' />
			</Form.Item>

			<FormButtons
				label={dataToEdit ? 'Editar' : 'Registrar'}
				isLoading={isLoading}
			/>
		</Form>
	);
};

export default CustomersForm;
