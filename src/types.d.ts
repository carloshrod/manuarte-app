/* eslint-disable no-unused-vars */

interface SubmitLoginDto {
	email: string;
	password: string;
}

interface ProductVariant {
	id: string;
	name: string;
	productId: string;
	vId: string;
	createdBy?: string;
	updatedBy?: string;
	createdDate?: string;
	updatedDate?: string;
	deletedDate?: string;
	productName?: string;
}

interface Product {
	id: string;
	name: string;
	description: string;
	categoryProductId: string;
	categoryProductName: string;
	productVariants: ProductVariant[];
}

interface SubmitProductDto {
	type?: 'create' | 'update' | 'updateVariant';
	name: string;
	description: string;
	categoryProductId?: string;
	productVariants?: string[];
	productVariantName?: string;
	productVariant?: {
		id: string;
		name?: string;
	};
}

interface ProductCategory {
	id: string;
	name: string;
	cId: string;
	createdBy: string;
	updatedBy: string;
	createdDate: string;
	updatedDate: string;
	deletedDate?: string;
}

interface Staff {
	id: string;
	email: string;
	roleId: string;
	isActive: boolean;
	personId: string;
	createdDate: string;
	fullName: string;
	docId: string;
	roleName: string;
}

interface Customer {
	id: string;
	personId: string;
	email: string;
	phoneNumber: string;
	createdDate: string;
	city: string;
	fullName: string;
	docId: string;
}

type DataTable = ProductVariant | ProductCategory | Staff | Customer;

interface UIModalState {
	isOpen: boolean;
	title: string | null;
	content: string | null;
	dataToEdit?: any;
}

interface RootState {
	ui: {
		modal: UIModalState;
	};
	product: {
		products: Product[];
		productVariants: ProductVariant[];
	};
	productCategory: {
		productCategories: ProductCategory[];
	};
}
