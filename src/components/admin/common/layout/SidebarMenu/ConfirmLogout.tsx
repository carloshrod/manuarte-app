import { Button } from 'antd';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { closeModal } from '@/reducers/ui/uiSlice';
import { useDispatch } from 'react-redux';
import { authServices } from '@/services/authServices';
import { doLogout } from '@/app/actions';
import { getSession } from 'next-auth/react';

const ConfirmLogout = () => {
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			const session = await getSession();
			const res = await authServices.logout(session?.refreshToken as string);
			if (res.status === 204) {
				dispatch(closeModal());
				await doLogout();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='flex flex-col gap-4'>
			<div className='block'>
				<BsFillQuestionCircleFill size={50} className='m-auto text-red-500' />
			</div>
			<p className='text-center text-xl font-semibold'>
				¿Estás seguro de que quieres cerrar sesión?
			</p>
			<div className='flex justify-center gap-6 mb-1'>
				<Button
					color='danger'
					variant='outlined'
					ghost
					onClick={() => dispatch(closeModal())}
					className='w-[130px]'
				>
					Cancelar
				</Button>
				<Button type='primary' className='w-[130px]' onClick={handleLogout}>
					Confirmar
				</Button>
			</div>
		</div>
	);
};

export default ConfirmLogout;
