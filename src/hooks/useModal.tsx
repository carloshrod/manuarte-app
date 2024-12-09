import ProductForm from '@/components/admin/products/ProductForm';
import ProductVariantForm from '@/components/admin/products/ProductVariantForm';
import ProductCategoryForm from '@/components/admin/products/ProductCategoryForm';
import { ReactNode } from 'react';
import { ModalContent } from '@/types/enums';

const useModal = () => {
	const MODAL_CONTENT: Record<ModalContent, ReactNode> = {
		[ModalContent.products]: <ProductForm />,
		[ModalContent.productVariants]: <ProductVariantForm />,
		[ModalContent.productCategories]: <ProductCategoryForm />,
		[ModalContent.staff]: <p>Form Staff</p>,
		[ModalContent.customers]: <p>Form Customers</p>
	};

	return { MODAL_CONTENT };
};

export default useModal;
