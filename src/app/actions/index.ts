'use server';
import { signIn, signOut } from '@/auth';
import { ROUTES } from '@/utils/routes';

export async function doCredentialLogin(values: SubmitLoginDto) {
	try {
		const res = await signIn('credentials', {
			email: values.email,
			password: values.password,
			redirect: false
		});

		return res;
	} catch (err) {
		console.error(err);
	}
}

export async function doLogout() {
	await signOut({ redirectTo: ROUTES.LOGIN });
}
