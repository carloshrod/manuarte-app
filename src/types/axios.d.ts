/* eslint-disable no-unused-vars */
import axios from 'axios';

declare module 'axios' {
	interface InternalAxiosRequestConfig {
		server?: boolean;
	}

	interface AxiosRequestConfig {
		server?: boolean;
	}
}
