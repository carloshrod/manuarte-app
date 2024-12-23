export const formatProductVariantState = (
	product: Product
): ProductVariant[] => {
	try {
		if (product?.productVariants?.length > 0) {
			return product.productVariants.map(productVariant => ({
				id: productVariant.id,
				vId: productVariant.vId,
				productId: product.id,
				productName: product.name,
				name: productVariant.name,
				productDescription: product.description,
				productCategoryId: product.productCategoryId,
				productCategoryName: product.productCategoryName
			}));
		}

		return [];
	} catch (error) {
		console.error(error);
		return [];
	}
};
