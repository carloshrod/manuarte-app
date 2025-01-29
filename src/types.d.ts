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

interface ProductVariantWithStock extends ProductVariant {
	productVariantId: string;
	quantity: number;
	currency: string;
	price: number;
	totalPrice: number;
	stockItemId: string;
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
	shopId?: string;
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

interface ExistingCustomer extends Customer {
	customerId: string;
}

interface SubmitCustomerDto {
	fullName: string;
	dni: string;
	email: string;
	phoneNumber: string;
	location: string;
	city: string;
	personId: string?;
	customerId: string?;
}

interface Shop {
	id: string;
	name: string;
	slug: string;
}

enum QuoteStatus {
	ACCEPTED = 'ACCEPTED',
	PENDING = 'PENDING',
	CANCELED = 'CANCELED',
	REVISION = 'REVISION',
	OVERDUE = 'OVERDUE'
}

interface QuoteItem {
	id: string;
	name: string;
	quantity: number;
	price: number;
	totalPrice: number;
}

interface Quote {
	id: string;
	serialNumber: string;
	shopId: string;
	customerId: string;
	status: QuoteStatus;
	currency: string;
	fullName: string;
	customerName: string;
	dni: string;
	email: string;
	phoneNumber: string;
	location: string;
	city: string;
	updatedDate: string;
	items: QuoteItem[];
	shipping: number;
}

interface SubmitQuoteDto extends SubmitCustomerDto {
	shopSlug?: string;
	shopId?: string;
	items: ProductVariantWithStock[];
	status: QuoteStatus;
	shipping: string;
	subtotal?: string;
	total?: string;
}

enum BillingStatus {
	PAID = 'PAID',
	PENDING_PAYMENT = 'PENDING_PAYMENT',
	CANCELED = 'CANCELED'
}

enum PaymentMethod {
	BANK_TRANSFER = 'BANK_TRANSFER',
	CASH = 'CASH',
	CREDIT_CARD = 'CREDIT_CARD',
	DEBIT_CARD = 'DEBIT_CARD',
	PAYPAL = 'PAYPAL',
	OTHER = 'OTHER'
}

interface BillingItem extends QuoteItem {}
interface Billing extends Omit<Quote, 'status'> {
	status: BillingStatus;
	paymentMethod: PaymentMethod;
}

interface SubmitBillingDto extends SubmitCustomerDto {
	shopSlug?: string;
	shopId?: string;
	items: ProductVariantWithStock[];
	status: BillingStatus;
	paymentMethod: PaymentMethod;
	shipping: string;
	subtotal?: string;
	total: string;
	currency: string;
}

interface StockItem {
	id: string;
	productName: string;
	productVariantName: string;
	productVariantId: string;
	currency: string;
	price: number;
	quantity: number;
	cost: number;
	updatedDate: string;
}

interface StockItemDto {
	productVariantId: string;
	price: number;
	quantity: number;
	cost: number;
	isSubjectToVAT: boolean;
}

type DataTable =
	| ProductVariant
	| ProductCategory
	| Staff
	| Customer
	| Quote
	| Billing
	| StockItem;

interface UIModalState {
	isOpen: boolean;
	title: string | null;
	content: string | null;
	dataToEdit?: any;
}

interface UIDrawerState extends UIModalState {
	customerInfo: ExistingCustomer;
	noCustomer: boolean;
}

interface RootState {
	ui: {
		modal: UIModalState;
		drawer: UIDrawerState;
	};
	product: {
		products: Product[];
		productVariants: ProductVariant[];
	};
	productCategory: {
		productCategories: ProductCategory[];
	};
	user: {
		staff: Staff[];
		customers: Customer[];
	};
	quote: {
		quotes: Quote[];
	};
	billing: {
		billings: Billing[];
	};
	stock: {
		stockItems: StockItem[];
	};
}
