import { ReactNode } from 'react';
import ProductForm from '@/components/admin/products/ProductForm';
import { ModalContentKey } from '@/enums';

const useModal = () => {
	const MODAL_FORM_CONTENT: Record<ModalContentKey, ReactNode> = {
		[ModalContentKey.Products]: <ProductForm />,
		[ModalContentKey.ProductVariants]: <p>Form ProductVariants</p>,
		[ModalContentKey.ProductCategories]: <p>Form ProductCategories</p>,
		[ModalContentKey.Users]: <p>Form Users</p>
	};

	return { MODAL_FORM_CONTENT };
};

export default useModal;
