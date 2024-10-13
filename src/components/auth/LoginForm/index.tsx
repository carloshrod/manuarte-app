import { Button, Form, Input } from 'antd';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

const LoginForm = () => {
	return (
		<div className='m-auto max-w-[400px] w-full px-8 py-4 rounded-lg max-md:shadow-2xl'>
			<Form name='login' className='flex flex-col gap-3'>
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
					<Button block type='primary' size='large' htmlType='submit'>
						INICIAR SESIÓN
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default LoginForm;
