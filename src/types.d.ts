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
	productCategoryId: string;
	productCategoryName: string;
	productVariants: ProductVariant[];
}

interface SubmitProductDto {
	type?: 'create' | 'update' | 'updateVariant';
	name: string;
	description: string;
	productCategoryId?: string;
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

interface Role {
	id: string;
	name: string;
}

interface SubmitStaffDto {
	fullName: string;
	dni: string;
	roleId: string;
	email: string;
	password: string;
}

interface Customer {
	id: string;
	personId: string;
	email: string;
	phoneNumber: string;
	createdDate: string;
	city: string;
	fullName: string;
	dni: string;
}

interface SubmitCustomerDto {
	fullName: string;
	dni: string;
	email: string;
	phoneNumber: string;
	location: string;
	city: string;
}

interface Shop {
	id: string;
	name: string;
	slug: string;
}

enum EstimateStatus {
	ACCEPTED = 'ACCEPTED',
	PENDING = 'PENDING',
	CANCELED = 'CANCELED',
	REVISION = 'REVISION',
	OVERDUE = 'OVERDUE'
}

interface QuoteItem {
	id: string;
	name: string;
	quantity: string;
	price: string;
	totalPrice: string;
}

interface Quote {
	id: string;
	serialNumber: string;
	status: EstimateStatus;
	currency: string;
	customerId: string;
	customerName: string;
	customerDni: string;
	customerEmail: string;
	customerPhoneNumber: string;
	shopId: string;
	dueDate: string;
	updatedDate: string;
	items: QuoteItem[];
}

type DataTable = ProductVariant | ProductCategory | Staff | Customer | Quote;

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
	users: {
		staff: Staff[];
		customers: Customer[];
	};
}
