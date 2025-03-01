'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, notification } from 'antd';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { doCredentialLogin } from '@/app/actions';
import { getSession } from 'next-auth/react';
import { AUTH_RULES } from '@/utils/auth';
import { ROUTES } from '@/utils/routes';

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [form] = Form.useForm();
	const router = useRouter();

	const handleSubmit = async (values: SubmitLoginDto) => {
		try {
			setIsLoading(true);
			const res = await doCredentialLogin({
				email: values.email,
				password: values.password
			});

			if (res) {
				const session = await getSession();
				const roleName = session?.user?.roleName as string;
				const shop = session?.user?.shop as string;
				const redirectTo =
					AUTH_RULES(shop)[roleName].defaultPath ?? ROUTES.LOGIN;

				router.push(redirectTo);
				notification.success({ message: 'Bienvenido!' });
				return;
			}

			notification.error({
				message: 'Credenciales inválidas. Inténtalo de nuevo!'
			});
		} catch (error) {
			console.error(error);
			notification.error({
				message: 'Ocurrió un error inesperado. Inténtalo más tarde!'
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='m-auto max-w-[400px] w-full px-8 py-4 rounded-lg max-md:shadow-2xl'>
			<Form
				form={form}
				name='login'
				className='flex flex-col gap-3'
				onFinish={values => handleSubmit(values)}
			>
				<div className='mb-8 text-center'>
					<h3 className='mb-2 text-gray-800 text-3xl font-bold'>
						Inicio de Sesión
					</h3>
					<p>Ingresa tu email y contraseña:</p>
				</div>

				<Form.Item
					name='email'
					rules={[{ required: true, message: 'Por favor ingresa tu email!' }]}
				>
					<Input
						size='large'
						prefix={<MdEmail size={20} />}
						placeholder='Email'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[
						{ required: true, message: 'Por favor ingresa tu contraseña!' }
					]}
				>
					<Input.Password
						size='large'
						prefix={<RiLockPasswordFill size={20} />}
						type='password'
						placeholder='Password'
					/>
				</Form.Item>

				<Form.Item>
					<Button
						block
						type='primary'
						size='large'
						htmlType='submit'
						loading={isLoading}
					>
						INICIAR SESIÓN
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default LoginForm;
