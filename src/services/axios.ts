import axios from 'axios';
import { ENV } from '@/config/env';
import { auth } from '@/auth';
import { getSession } from 'next-auth/react';

const BASE_URL = ENV.BASE_URL;

export default axios.create({
	baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

axiosPrivate.interceptors.request.use(
	async config => {
		try {
			let accessToken = null;

			if (config?.server) {
				const session = await auth();
				accessToken = session?.accessToken;
			} else {
				const session = await getSession();
				accessToken = session?.accessToken;
			}

			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
		} catch (error) {
			console.error('Error al obtener el token de autenticación:', error);
			throw error;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
