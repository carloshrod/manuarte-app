import useForm from '@/hooks/useForm';
import { userServices } from '@/services/userServices';
import { Form, Input, Select, Switch } from 'antd';
import { useEffect, useState } from 'react';
import FormButtons from '../../common/FormButtons';
import { useSelector } from 'react-redux';
import { formatRoleName } from '@/utils/utils';

const StaffForm = () => {
	const { form, isLoading, submitRegisterStaff, submitUpdateStaff } = useForm();
	const [staffRoles, setStaffRoles] = useState<Role[]>([]);
	const [editPassword, setEditPassword] = useState(false);
	const {
		modal: { dataToEdit }
	} = useSelector((state: RootState) => state.ui);

	const fetchRoles = async () => {
		const data = await userServices.getStaffRoles();
		if (data.length > 0) {
			setStaffRoles(data);
		}
	};

	useEffect(() => {
		if (dataToEdit) {
			form.setFieldsValue(dataToEdit);
		}
		fetchRoles();
	}, []);

	const onSubmit = async (values: SubmitStaffDto) => {
		if ('confirmPassword' in values) {
			delete values.confirmPassword;
		}
		if (!dataToEdit) {
			await submitRegisterStaff(values);
		} else {
			await submitUpdateStaff(values, dataToEdit.personId);
		}
	};

	const onChangeSwitch = (checked: boolean) => {
		setEditPassword(checked);
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
						message: 'El nombre del usuario es requerido'
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
				name='roleId'
				label='Rol de usuario'
				rules={[
					{
						required: true,
						message: 'El rol del usuario es requerido'
					}
				]}
			>
				<Select placeholder='Selecciona un rol de usuario' allowClear>
					{staffRoles?.length > 0
						? staffRoles.map(role => (
								<Select.Option key={role.id} value={role.id}>
									{formatRoleName(role.name)}
								</Select.Option>
							))
						: null}
				</Select>
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
				<Input placeholder='Ingresa el email del usuario' />
			</Form.Item>

			{dataToEdit ? (
				<div className='flex gap-2 my-6 px-2 text-gray-500'>
					<Switch
						defaultChecked={false}
						onChange={onChangeSwitch}
						id='switch'
					/>
					<label htmlFor='switch'>Cambiar contraseña</label>
				</div>
			) : null}
			{!dataToEdit || editPassword ? (
				<div className='flex justify-between'>
					<Form.Item
						name='password'
						label='Contraseña'
						rules={[
							{
								required: !dataToEdit || editPassword,
								message: 'La contraseña es requerida'
							}
						]}
						hasFeedback
					>
						<Input.Password
							type='password'
							placeholder='Ingresa la contraseña del usuario'
						/>
					</Form.Item>
					<Form.Item
						name='confirmPassword'
						label='Confirmar contraseña'
						dependencies={['password']}
						hasFeedback
						rules={[
							{
								required: !dataToEdit || editPassword,
								message: 'Por favor, confirma la contraseña'
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error('Las contraseñas no coinciden')
									);
								}
							})
						]}
					>
						<Input.Password />
					</Form.Item>
				</div>
			) : null}

			<FormButtons
				label={dataToEdit ? 'Editar' : undefined}
				isLoading={isLoading}
			/>
		</Form>
	);
};

export default StaffForm;
