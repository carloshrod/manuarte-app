export const COL_PAYMENT_METHOD_FILTER = [
	{ text: 'EFECTIVO', value: 'CASH' },
	{ text: 'TRANSFERENCIA RI', value: 'BANK_TRANSFER_RT' },
	{ text: 'TRANSFERENCIA RO', value: 'BANK_TRANSFER_RBT' },
	{ text: 'TRANSFERENCIA', value: 'BANK_TRANSFER' },
	{ text: 'NEQUI', value: 'NEQUI' },
	{ text: 'BOLD', value: 'BOLD' },
	{ text: 'EFECTY', value: 'EFECTY' },
	{ text: 'WOMPI', value: 'WOMPI' },
	{ text: 'OTRO', value: 'OTHER' }
];

export const ECU_PAYMENT_METHOD_FILTER = [
	{ text: 'EFECTIVO', value: 'CASH' },
	{ text: 'TRANSFERENCIA RI', value: 'BANK_TRANSFER_RT' },
	{ text: 'TRANSFERENCIA RO', value: 'BANK_TRANSFER_RBT' },
	{ text: 'TRANSFERENCIA', value: 'BANK_TRANSFER' },
	{ text: 'PAYPHONE', value: 'PAYPHONE' },
	{ text: 'DEPÓSITO', value: 'BANK_DEPOSIT' },
	{ text: 'OTRO', value: 'OTHER' }
];

export const validateUniqueProductVariantsName = (
	array: ProductVariantStockItem[]
): boolean => {
	const seen = new Set<unknown>();

	for (const item of array) {
		if (seen.has(item.name)) {
			return false;
		}
		seen.add(item.name);
	}

	return true;
};

export const getStockStatusColor = ({
	quantity,
	maxQty,
	minQty
}: {
	quantity: number;
	maxQty: number;
	minQty: number;
}) => {
	let stockStatusColor = 'text-emerald-500';

	const stockPercentage = (quantity / maxQty) * 100;

	if (quantity <= minQty) {
		stockStatusColor = 'text-red-500';
	} else if (stockPercentage <= 75) {
		stockStatusColor = 'text-yellow-500';
	}

	return stockStatusColor;
};

export const TAG_COLORS: Record<string, string> = {
	ENTER: '#0D6EFD',
	TRANSFER: '#eab308',
	EXIT: '#E53535',
	BILLING: '#10b981'
};
