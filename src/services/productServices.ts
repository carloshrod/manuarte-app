import axios from 'axios';
import { ENDPOINTS } from '@/config/env';

export const getAllProducts = async () => {
	try {
		const res = await axios.get(ENDPOINTS.products);

		return res.data;
	} catch (error) {
		console.error(error);
	}
};

export const getAllProductCategories = async () => {
	try {
		const res = await axios.get(ENDPOINTS.productCategories);

		return res.data;
	} catch (error) {
		console.error(error);
	}
};
