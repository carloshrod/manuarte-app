'use client';
import Image from 'next/image';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
	return (
		<main className='min-h-screen flex flex-col items-center justify-center p-6'>
			<div className='grow grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full'>
				<div>
					<h1 className='mb-6 text-[#1677FF] text-5xl text-center font-extrabold'>
						MANUARTE
					</h1>
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
