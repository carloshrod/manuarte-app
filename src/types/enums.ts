/* eslint-disable no-unused-vars */
export enum ModalContent {
	products = 'products',
	productVariants = 'productVariants',
	productCategories = 'productCategories',
	staff = 'staff',
	permissions = 'permissions',
	customers = 'customers',
	generateBilling = 'generateBilling',
	logout = 'logout'
}

export enum DrawerContent {
	quotes = 'quotes',
	billings = 'billings'
}

export enum QuoteStatus {
	ACCEPTED = 'ACCEPTED',
	PENDING = 'PENDING',
	CANCELED = 'CANCELED',
	REVISION = 'REVISION',
	OVERDUE = 'OVERDUE'
}

export enum BillingStatus {
	PAID = 'PAID',
	PENDING_PAYMENT = 'PENDING_PAYMENT',
	CANCELED = 'CANCELED'
}

export enum PaymentMethod {
	BANK_TRANSFER = 'BANK_TRANSFER',
	CASH = 'CASH',
	CREDIT_CARD = 'CREDIT_CARD',
	DEBIT_CARD = 'DEBIT_CARD',
	PAYPAL = 'PAYPAL',
	OTHER = 'OTHER'
}
