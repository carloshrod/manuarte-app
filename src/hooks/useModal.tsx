import { ReactNode } from 'react';
import ProductForm from '@/components/admin/products/ProductForm';
import ProductVariantForm from '@/components/admin/products/ProductVariantForm';
import { ModalContent } from '@/enums';
import ProductCategoryForm from '@/components/admin/products/ProductCategoryForm';

const useModal = () => {
	const MODAL_CONTENT: Record<ModalContent, ReactNode> = {
		[ModalContent.products]: <ProductForm />,
		[ModalContent.productVariants]: <ProductVariantForm />,
		[ModalContent.productCategories]: <ProductCategoryForm />,
		[ModalContent.users]: <p>Form Users</p>
	};

	return { MODAL_CONTENT };
};

export default useModal;
