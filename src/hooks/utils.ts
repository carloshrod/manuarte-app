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
