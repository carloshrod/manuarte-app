/* eslint-disable no-unused-vars */
export enum ModalContent {
	products = 'products',
	productVariants = 'productVariants',
	productCategories = 'productCategories',
	staff = 'staff',
	permissions = 'permissions',
	customers = 'customers',
	billings = 'billings',
	stockItems = 'stockItems',
	confirm = 'confirm'
}

export enum DrawerContent {
	quotes = 'quotes',
	billings = 'billings',
	directEnter = 'directEnter',
	transfer = 'transfer',
	enterByTransfer = 'enterByTransfer',
	exit = 'exit',
	transactionDetails = 'transactionDetails',
	transactionHistoryDetails = 'transactionHistoryDetails',
	recentActivityDetails = 'recentActivityDetails'
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

export enum TransactionType {
	ENTER = 'ENTER',
	TRANSFER = 'TRANSFER',
	EXIT = 'EXIT'
}

export enum DiscountType {
	FIXED = 'FIXED',
	PERCENTAGE = 'PERCENTAGE'
}
