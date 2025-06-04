import { productServices } from '@/services/productServices';
import { userServices } from '@/services/userServices';
import { cityServices } from '@/services/cityServices';
import { FormInstance } from 'antd';

export const updateCalculations = (form: FormInstance) => {
	const items: ProductVariantWithStock[] = form.getFieldValue('items') || [];
	const shipping = parseFloat(form.getFieldValue('shipping')) || 0;

	const subtotal = items.reduce((total, item) => {
		const totalPrice = item?.totalPrice || 0;
		return Number(total) + Number(totalPrice);
	}, 0);

	form.setFieldsValue({
		subtotal,
		total: subtotal + shipping
	});
};

export const getProductsData = async ({
	currentValue,
	newValue,
	stockId,
	missingProducts
}: {
	currentValue: string;
	newValue: string;
	stockId: string;
	missingProducts?: boolean;
}) => {
	try {
		const data = await productServices.searchProductVariants({
			stockId,
			search: newValue,
			missingProducts
		});

		let formattedData;
		if (currentValue === newValue) {
			formattedData = data.map((item: any) => {
				const quantity = 'quantity' in item ? `(${item?.quantity} unds)` : '';

				return {
					value: item.id,
					label: `${item.productName} - ${item.name} ${quantity}`
				};
			});
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

export const getCitiesData = async ({
	currentValue,
	newValue
}: {
	currentValue: string;
	newValue: string;
}) => {
	try {
		const data = await cityServices.search(newValue);

		let formattedData;
		if (currentValue === newValue) {
			formattedData = data.map((item: any) => ({
				value: item.id,
				label: `${item?.name}, ${item?.regionName}, ${item?.countryIsoCode}`
			}));
		}

		return { formattedData, data };
	} catch (error) {
		console.error(error);
	}
};

export const selectFilterOption = (
	input: string,
	option: { value: string; label: string | null } | undefined
) => {
	try {
		const label = (option?.label as string)?.toLowerCase();

		return label?.includes(input.toLowerCase());
	} catch (error) {
		console.error(error);
		return false;
	}
};
