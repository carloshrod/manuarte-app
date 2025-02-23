import { useEffect, useState } from 'react';
import { Form, Input, Select, Switch } from 'antd';
import { useSelector } from 'react-redux';
import FormButtons from '../../common/ui/FormButtons';
import useForm from '@/hooks/useForm';
import { userServices } from '@/services/userServices';
import { shopServices } from '@/services/shopServices';
import { formatToTitleCase } from '@/utils/formats';
import {
	createStaffSchema,
	editStaffSchema,
	validateForm
} from '@/utils/validators';

const StaffForm = () => {
	const { form, isLoading, submitRegisterStaff, submitUpdateStaff } = useForm();
	const [staffRoles, setStaffRoles] = useState<Role[]>([]);
	const [shops, setShops] = useState<Shop[]>([]);
	const [editPassword, setEditPassword] = useState(false);
	const [selectedRole, setSelectedRole] = useState('');
	const {
		modal: { dataToEdit }
	} = useSelector((state: RootState) => state.ui);

	const fetchRoles = async () => {
		const data = await userServices.getStaffRoles();
		if (data.length > 0) {
			setStaffRoles(data);
		}
	};

	const fetchShops = async () => {
		const data = await shopServices.getAll(false);
		if (data.length > 0) {
			setShops(data);
		}
	};

	useEffect(() => {
		if (dataToEdit) {
			form.setFieldsValue(dataToEdit);
		}
		fetchRoles();
		fetchShops();
	}, []);

	useEffect(() => {
		if (dataToEdit && staffRoles.length > 0) {
			const roleName = getRoleSelectedName(dataToEdit?.roleId);
			if (roleName) {
				setSelectedRole(roleName);
			}
		}
	}, [dataToEdit, staffRoles]);

	const onSubmit = async (values: SubmitStaffDto) => {
		const isValid = !dataToEdit
			? await validateForm(values, createStaffSchema, form)
			: await validateForm(values, editStaffSchema, form);
		if (!isValid) return;

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

	const getRoleSelectedName = (roleId: string) => {
		return staffRoles.find(role => role.id === roleId)?.name ?? '';
	};

	const roleHandleChange = (value: string) => {
		const roleSelected = getRoleSelectedName(value);
		if (roleSelected) {
			setSelectedRole(roleSelected);
		}

		if (roleSelected === 'admin') {
			form.setFieldsValue({ shopId: undefined });
		}
	};

	const roleOptions = staffRoles.map(role => {
		return {
			value: role.id,
			label: formatToTitleCase(role.name)
		};
	});

	const shopOptions = shops.map(shop => {
		return {
			value: shop.id,
			label: formatToTitleCase(shop.name)
		};
	});

	const isShopDisabled = selectedRole === 'admin' || selectedRole === '';

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
				<Select
					placeholder='Selecciona un rol de usuario'
					allowClear
					options={roleOptions}
					onChange={value => roleHandleChange(value)}
				/>
			</Form.Item>

			<Form.Item
				name='shopId'
				label='Tienda'
				rules={[
					{
						required: !isShopDisabled,
						message: !isShopDisabled ? 'La tienda es requerida' : ''
					}
				]}
			>
				<Select
					placeholder='Selecciona una tienda'
					allowClear
					filterOption={(input, option) => {
						try {
							const label = (option?.label as string)?.toLowerCase();

							return label?.includes(input.toLowerCase());
						} catch (error) {
							console.error(error);
							return false;
						}
					}}
					options={shopOptions}
					disabled={isShopDisabled}
				/>
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
				<div className='flex justify-between gap-4'>
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
						style={{ width: '50%' }}
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
						style={{ width: '50%' }}
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
