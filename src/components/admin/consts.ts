export const CUSTOMER_INPUTS_PROPS = [
	{
		name: 'dni',
		label: 'Nro. de Documento',
		ruleMsg: 'El número de documento es requerido',
		placeholder: 'Ingresa el número de documento'
	},
	{
		name: 'fullName',
		label: 'Nombre',
		ruleMsg: 'El nombre del cliente es requerido',
		placeholder: 'Ingresa el nombre completo'
	},
	{
		name: 'email',
		label: 'Email',
		placeholder: 'Ingresa el email'
	},
	{
		name: 'phoneNumber',
		label: 'Nro. de Teléfono',
		ruleMsg: 'El número de teléfono es requerido',
		placeholder: 'Ingresa el número de teléfono'
	},
	{
		name: 'location',
		label: 'Dirección',
		ruleMsg: 'La dirección es requerida',
		placeholder: 'Ingresa la dirección'
	},
	{
		name: 'cityId',
		label: 'Ciudad',
		ruleMsg: 'La ciudad es requerida',
		placeholder: 'Ingresa la ciudad'
	}
];

export const PRODUCTS_LIST_INPUTS_PROPS = [
	{
		name: 'name',
		label: 'Nombre',
		type: 'text',
		minWidth: 360,
		width: '45%'
	},
	{
		name: 'quantity',
		label: 'Cantidad',
		type: 'number',
		ruleMsg: 'La cantidad es requerida',
		placeholder: 'Ingresa la cantidad del producto',
		minWidth: 80,
		width: '10%'
	},
	{
		name: 'currency',
		label: 'Moneda',
		type: 'text',
		minWidth: 80,
		width: '10%'
	},
	{
		name: 'price',
		label: 'Precio Unitario',
		type: 'number',
		ruleMsg: 'El precio es requerido',
		placeholder: 'Ingresa el precio del producto',
		minWidth: 120,
		width: '15%'
	},
	{
		name: 'totalPrice',
		label: 'Precio Total',
		type: 'number',
		minWidth: 120,
		width: '15%'
	}
];

export const TRANSACTIONS_PRODUCTS_LIST_INPUTS_PROPS = [
	{
		name: 'name',
		label: 'Nombre',
		type: 'text',
		width: '80%'
	},
	{
		name: 'quantity',
		label: 'Cantidad',
		type: 'number',
		ruleMsg: 'La cantidad es requerida',
		placeholder: 'Ingresa la cantidad del producto',
		width: '15%'
	}
];

export const QUOTE_CALCULATIONS_INPUTS_PROPS = [
	{
		name: 'subtotal',
		label: 'Subtotal',
		readOnly: true
	},
	{
		name: 'discountType',
		label: 'Calcular descuento por',
		readOnly: false
	},
	{
		name: 'discount',
		label: 'Descuento',
		readOnly: false
	},
	{
		name: 'shipping',
		label: 'Flete',
		readOnly: false
	},
	{
		name: 'total',
		label: 'Total',
		readOnly: true
	}
];

export const PRODUCT_VARIANT_PROPS = [
	{
		name: 'name',
		label: 'Nombre',
		placeholder: 'Unidad',
		type: 'text',
		width: '50%'
	},
	{
		name: 'minQty',
		label: 'Cant. Min.',
		placeholder: '9',
		type: 'number',
		width: '23%'
	},
	{
		name: 'maxQty',
		label: 'Cant. Max.',
		placeholder: '9',
		type: 'number',
		width: '23%'
	},
	{
		name: 'priceCop',
		label: 'Precio COP',
		placeholder: '$10.000',
		type: 'number',
		width: '23.5%'
	},
	{
		name: 'costCop',
		label: 'Costo COP',
		placeholder: '$5.000',
		type: 'number',
		width: '23.5%'
	},
	{
		name: 'priceUsd',
		label: 'Precio USD',
		placeholder: '$4',
		type: 'number',
		width: '23.5%'
	},
	{
		name: 'costUsd',
		label: 'Costo USD',
		placeholder: '$2',
		type: 'number',
		width: '23.5%'
	}
];

export const QUOTE_STATUS_OPTIONS = [
	{ value: 'PENDING', label: 'Por pagar' },
	{ value: 'ACCEPTED', label: 'Aceptada' },
	{ value: 'REVISION', label: 'En revisión' }
];

export const BILLING_STATUS_OPTIONS = [
	{ value: 'PAID', label: 'Pagada' },
	{ value: 'PENDING_PAYMENT', label: 'Pago pendiente' },
	{ value: 'PARTIAL_PAYMENT', label: 'Pago parcial' }
];

export const COL_PAYMENT_METHOD_OPTIONS = [
	{ value: 'CASH', label: 'Efectivo' },
	{ value: 'BANK_TRANSFER_RT', label: 'Transferencia RI' },
	{ value: 'BANK_TRANSFER_RBT', label: 'Transferencia RO' },
	{ value: 'NEQUI', label: 'Nequi' },
	{ value: 'BOLD', label: 'Bold' },
	{ value: 'EFECTY', label: 'Efecty' },
	{ value: 'WOMPI', label: 'Wompi' },
	{ value: 'OTHER', label: 'Otro' }
];

export const ECU_PAYMENT_METHOD_OPTIONS = [
	{ value: 'CASH', label: 'Efectivo' },
	{ value: 'BANK_TRANSFER_RT', label: 'Transferencia RI' },
	{ value: 'BANK_TRANSFER_RBT', label: 'Transferencia RO' },
	{ value: 'PAYPHONE', label: 'PayPhone' },
	{ value: 'BANK_DEPOSIT', label: 'Depósito' },
	{ value: 'OTHER', label: 'Otro' }
];
