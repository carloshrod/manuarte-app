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
	stocks: string[];
}

interface Product {
	id: string;
	name: string;
	description: string;
	productCategoryId: string;
	productCategoryName: string;
	productVariants: ProductVariant[];
}

interface ProductVariantStockItem {
	name: string;
	costCop?: number;
	costUsd?: number;
	priceCop?: number;
	priceUsd?: number;
	maxQty: number;
	minQty: number;
}

interface SubmitProductDto {
	type?: 'create' | 'update' | 'updateVariant';
	name: string;
	description: string;
	productCategoryId?: string;
	productVariants?: ProductVariantStockItem[];
	productVariantName?: string;
	productVariant?: {
		id: string;
		name?: string;
	};
	stockIds?: string[];
	stocks?: { id: string; currency: string }[];
}

interface SubmitProductVariantDto extends ProductVariantStockItem {
	productId: string;
	stockIds?: string[];
	stocks?: { id: string; currency: string }[];
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
	customerId?: string;
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
	currency: string;
	stockId: string;
	stockName: string;
	mainStock?: boolean;
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
	createdDate: string;
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
	CASH = 'CASH',
	BANK_TRANSFER = 'BANK_TRANSFER',
	BANK_TRANSFER_RT = 'BANK_TRANSFER_RT',
	BANK_TRANSFER_RBT = 'BANK_TRANSFER_RBT',
	DEBIT_CARD = 'DEBIT_CARD',
	CREDIT_CARD = 'CREDIT_CARD',
	NEQUI = 'NEQUI',
	BOLD = 'BOLD',
	EFECTY = 'EFECTY',
	WOMPI = 'WOMPI',
	PAYPHONE = 'PAYPHONE',
	PAYPAL = 'PAYPAL',
	BANK_DEPOSIT = 'BANK_DEPOSIT',
	OTHER = 'OTHER'
}

interface BillingItem extends QuoteItem {}
interface Billing extends Omit<Quote, 'status'> {
	status: BillingStatus;
	paymentMethod: PaymentMethod;
	total: number;
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
	vId: string;
	productVariantId: string;
	productVariantName: string;
	currency: string;
	price: number;
	quantity: number;
	cost: number;
	maxQty: number;
	minQty: number;
	createdDate: string;
	updatedDate: string;
}

interface StockItemHistory extends StockItem {
	type: string;
	stockBefore: number;
	stockFromId: string;
	stockFromName: string;
	stockToId: string;
	stockToName: string;
}

interface SubmitStockItemDto {
	stockId: string;
	productVariantId: string;
	currency: string;
	price: number;
	quantity: number;
	cost: number;
	minQty: number;
	maxQty: number;
}

interface Transaction {
	id: string;
	name: string;
	state: string;
	type: string;
	fromName: string;
	fromId: string;
	toName: string;
	toId: string;
	description: string;
	shippingDate: string;
	createdDate: string;
	updatedDate: string;
}

enum TransactionType {
	ENTER = 'ENTER',
	TRANSFER = 'TRANSFER',
	EXIT = 'EXIT'
}

interface SubmitTransactionDto {
	supplierId: string;
	fromId: string;
	toId: string;
	description: string;
	type: TransactionType;
	items: ProductVariantWithStock[];
	transferId?: string;
}

interface TransactionItem {
	id: string;
	productVariantId: string;
	stockItemId: string;
	productVariantName: string;
	productName: string;
	quantity: string;
	stockItemQuantity: string;
}

type DataTable =
	| ProductVariant
	| ProductCategory
	| Staff
	| Customer
	| Quote
	| Billing
	| StockItem
	| Transaction;

interface RootState {
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
		filteredBillings: Billing[];
	};
	stock: {
		stockItems: StockItem[];
	};
	transaction: {
		transactions: Transaction[];
	};
	shop: {
		shops: Shop[];
	};
}
