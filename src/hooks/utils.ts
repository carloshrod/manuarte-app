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
