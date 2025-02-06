import { useEffect, useState } from 'react';
import { Form, Select, Tag } from 'antd';
import { BiUserCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import FormButtons from '../../common/ui/FormButtons';
import useForm from '@/hooks/useForm';
import { userServices } from '@/services/userServices';
import { generatePermissionOptions } from '@/utils/auth';
import { formatToTitleCase, formatUserExtraPermissions } from '@/utils/formats';

const PermissionsForm = () => {
	const { form, isLoading, submitEditPermissions } = useForm();
	const {
		modal: { dataToEdit }
	} = useSelector((state: RootState) => state.ui);
	const [assignablePermissions, setAssignablePermissions] = useState([]);
	const [cleanPermissions, setCleanPermissions] = useState(false);
	const hasAssignablePermissions = assignablePermissions?.length > 0;

	const fetchAssignablePermissions = async () => {
		if (dataToEdit) {
			const data = await userServices.getAssignablePermissions(dataToEdit.id);
			setAssignablePermissions(data);

			const formattedExtraPermissions = formatUserExtraPermissions(
				dataToEdit?.extraPermissions
			);

			form.setFieldsValue({
				extraPermissions:
					formattedExtraPermissions?.map(
						(permission: { id: string }) => permission.id
					) || []
			});
		}
	};

	useEffect(() => {
		fetchAssignablePermissions();
	}, []);

	const onSubmit = (values: { extraPermissions: string[] }) => {
		if (dataToEdit) {
			submitEditPermissions(values, dataToEdit.id);
		}
	};

	return dataToEdit ? (
		<Form
			layout='vertical'
			form={form}
			name='form_in_modal'
			initialValues={{ modifier: 'public' }}
			clearOnDestroy
			onFinish={values => onSubmit(values)}
		>
			<div className='flex gap-2 ps-1 my-4'>
				<h4 className='font-medium'>{dataToEdit?.fullName}</h4>
				<Tag
					icon={<BiUserCircle />}
					color='#10b981'
					style={{ display: 'flex', gap: 4, alignItems: 'center' }}
				>
					{formatToTitleCase(dataToEdit?.roleName)}
				</Tag>
			</div>

			{hasAssignablePermissions ? (
				<Form.Item
					name='extraPermissions'
					label='Permisos adicionales de usuario'
					help={
						cleanPermissions
							? 'Si envías el formulario vacío, se eliminarán todos los permisos actuales'
							: undefined
					}
				>
					<Select
						mode='multiple'
						placeholder='Selecciona los permisos'
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
						options={
							assignablePermissions.length > 0
								? generatePermissionOptions(assignablePermissions)
								: undefined
						}
						onChange={value => setCleanPermissions(value?.length === 0)}
					/>
				</Form.Item>
			) : (
				<h4 className='mb-4 italic font-semibold'>
					No hay permisos adicionales para este usuario
				</h4>
			)}

			<FormButtons
				label='Editar'
				isLoading={isLoading}
				disabled={!hasAssignablePermissions}
			/>
		</Form>
	) : null;
};

export default PermissionsForm;
