import Image from 'next/image';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = async () => {
	return (
		<main className='min-h-screen flex flex-col items-center justify-center p-6'>
			<div className='grow grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full'>
				<div>
					<Image
						src='/logo-manuarte.png'
						className='w-full h-[150px] object-contain mb-6'
						alt='login-image'
						width={466}
						height={230}
						priority
					/>
					<LoginForm />
				</div>
				<div className='relative hidden md:block md:h-full lg:p-12 p-8'>
					<Image
						src='/login.svg'
						className='w-full h-full object-contain'
						alt='login-image'
						width={1920}
						height={1920}
						priority
					/>
				</div>
			</div>
		</main>
	);
};

export default LoginPage;
