import { auth } from '@/auth';
import { ROUTES } from '@/utils/routes';
import { redirect } from 'next/navigation';

const NotFound = async () => {
	const session = await auth();
	const redirectTo = session ? ROUTES.DASHBOARD : ROUTES.LOGIN;

	redirect(redirectTo);
};

export default NotFound;
