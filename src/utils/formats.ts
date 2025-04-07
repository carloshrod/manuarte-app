import { PERMISSION_MAP } from './mappings';

const units = ['cc', 'kg', 'mm', 'cm', 'm', 'l', 'ml'];

export const formatToTitleCase = (str: string) => {
	if (!str) return null;

	const unitSet = new Set(units.map(unit => unit.toLowerCase()));

	const isUnit = (word: string) => unitSet.has(word.toLowerCase());

	if (!/\s/.test(str)) {
		if (isUnit(str)) {
			return str.toLowerCase();
		}

		return (
			`${str?.charAt(0).toUpperCase()}${str?.slice(1).toLowerCase()}` || ''
		);
	}

	return str
		.split(' ')
		.map(word =>
			isUnit(word)
				? word.toLowerCase()
				: `${word?.charAt(0).toUpperCase()}${word?.slice(1).toLowerCase()}`
		)
		.join(' ');
};

export const formatCurrency = (amount: number | string) => {
	const currency = Number(amount);
	if (isNaN(currency)) return 'Invalid number';

	const [integerPart, decimalPart] = currency.toFixed(2).toString().split('.');

	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

	return decimalPart && +decimalPart > 0
		? `$${formattedInteger},${decimalPart.padEnd(2, '0')}`
		: `$${formattedInteger}`;
};

export const formatInputCurrency = (value: number | undefined) => {
	if (!value) return '';

	const numericValue = parseFloat(value.toString());

	const [integerPart, decimalPart] = numericValue.toFixed(2).split('.');

	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	return decimalPart && parseInt(decimalPart) > 0
		? `$ ${formattedInteger}.${decimalPart}`
		: `$ ${formattedInteger}`;
};

export const formatUserExtraPermissions = (
	extraPermissions: { id: string; name: string }[]
) => {
	try {
		return extraPermissions?.map(permission => ({
			...permission,
			name: PERMISSION_MAP[permission.name] || permission.name
		}));
	} catch (error) {
		console.error(error);
	}
};
