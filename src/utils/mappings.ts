export const QUOTE_STATUS_MAP: Record<string, string> = {
	ACCEPTED: 'ACEPTADA',
	PENDING: 'POR PAGAR',
	CANCELED: 'ANULADA',
	REVISION: 'EN REVISIÓN',
	OVERDUE: 'VENCIDA'
};

export const BILLING_STATUS_MAP: Record<string, string> = {
	PAID: 'FACTURADA',
	PENDING_PAYMENT: 'PAGO PENDIENTE',
	PARTIAL_PAYMENT: 'PAGO PARCIAL',
	PENDING_DELIVERY: 'POR ENTREGAR',
	CANCELED: 'ANULADA'
};

export const PAYMENT_METHOD_MAP: Record<string, string> = {
	CASH: 'EFECTIVO',
	BANK_TRANSFER_RT: 'TRANSFERENCIA RI',
	BANK_TRANSFER_RBT: 'TRANSFERENCIA RO',
	DEBIT_CARD: 'TARJETA DÉBITO',
	CREDIT_CARD: 'TARJETA CRÉDITO',
	NEQUI: 'NEQUI',
	BOLD: 'BOLD',
	EFECTY: 'EFECTY',
	WOMPI: 'WOMPI',
	PAYPHONE: 'PAYPHONE',
	PAYPAL: 'PAYPAL',
	BANK_DEPOSIT: 'DEPÓSITO',
	OTHER: 'OTRO'
};

export const PERMISSION_MAP: Record<string, string> = {
	'product-read': 'Ver productos',
	'product-create': 'Crear productos',
	'product-update': 'Editar productos',
	'product-delete': 'Eliminar productos',
	'customer-read': 'Ver clientes',
	'customer-create': 'Crear clientes',
	'customer-update': 'Editar clientes',
	'customer-delete': 'Eliminar clientes',
	'transaction-direct-enter': 'Hacer ingresos directos'
};

export const TRANSACTION_STATES_MAP: Record<string, string> = {
	SUCCESS: 'Realizado',
	PROGRESS: 'En Progreso'
};

export const TRANSACTION_TYPES_MAP: Record<string, string> = {
	ENTER: 'Entrada',
	EXIT: 'Salida',
	TRANSFER: 'Transferencia'
};

export const CASH_MOVEMENT_CAT_MAP: Record<string, string> = {
	SALE: 'VENTA',
	DELIVERY: 'DOMICILIO',
	INBOUND_SHIPPING: 'FLETE DE ENTRADA',
	PURCHASE: 'COMPRA',
	CHANGE: 'CAMBIO',
	PIGGY_BANK: 'ALCANCÍA',
	SHORTAGE_COVER: 'COB. DE FALTANTE',
	OTHER: 'OTRO'
};
