/* eslint-disable no-unused-vars */

interface VariantProduct {
	id: string;
	name: string;
	quantity: number;
	productId: string;
	vId: string;
	createdBy: string;
	updatedBy: string;
	createdDate: string;
	updatedDate: string;
	qrCode: string;
}

interface Product {
	id: string;
	name: string;
	description: string;
	pId: string;
	categoryProductId: string;
	createdBy: string;
	updatedBy: string;
	createdDate: string;
	updatedDate: string;
	variantProducts: VariantProduct[];
	category: null;
}

interface ProductCategory {
	id: string;
	name: string;
	cId: string;
	createdBy: string;
	updatedBy: string;
	createdDate: string;
	updatedDate: string;
}

type DataTable = Product | ProductCategory;

interface UIModalState {
	isOpen: boolean;
	title: string | null;
	content: string | null;
}

interface RootState {
	ui: {
		modal: UIModalState;
	};
}
