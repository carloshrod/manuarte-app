import { productServices } from '@/services/productServices';
import { userServices } from '@/services/userServices';

export const getProductsData = async ({
	currentValue,
	newValue,
	shopSlug
}: {
	currentValue: string;
	newValue: string;
	shopSlug: string;
}) => {
	try {
		const data = await productServices.getProductsWithStockInfo({
			shopSlug: shopSlug as string,
			search: newValue
		});

		let formattedData;
		if (currentValue === newValue) {
			formattedData = data.map((item: any) => ({
				value: item.id,
				label: `${item.productName} ${item.name}`
			}));
		}

		return { formattedData, data };
	} catch (error) {
		console.error(error);
	}
};

export const getCustomersData = async ({
	currentValue,
	newValue
}: {
	currentValue: string;
	newValue: string;
}) => {
	try {
		const data = await userServices.searchCustomer(newValue);

		let formattedData;
		if (currentValue === newValue) {
			formattedData = data.map((item: any) => ({
				value: item.personId,
				label: `${item.fullName} - ${item.dni}`
			}));
		}

		return { formattedData, data };
	} catch (error) {
		console.error(error);
	}
};
