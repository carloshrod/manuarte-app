export const mapQuoteBody = (body: SubmitQuoteDto) => {
	const {
		personId,
		customerId,
		shopSlug,
		shopId,
		items,
		status,
		discountType,
		discount,
		shipping,
		fullName,
		dni,
		email,
		phoneNumber,
		location,
		cityId
	} = body;

	return {
		quoteData: {
			shopSlug,
			shopId,
			items,
			status,
			discountType,
			discount,
			shipping
		},
		customerData: {
			personId,
			customerId,
			fullName,
			dni,
			email,
			phoneNumber,
			location,
			cityId
		}
	};
};

export const mapBillingBody = (body: SubmitBillingDto) => {
	const {
		personId,
		customerId,
		shopSlug,
		shopId,
		items,
		status,
		payments,
		discountType,
		discount,
		shipping,
		subtotal,
		currency,
		fullName,
		dni,
		email,
		phoneNumber,
		location,
		cityId,
		clientRequestId,
		comments,
		balanceToUse
	} = body;

	return {
		billingData: {
			shopSlug,
			shopId,
			items,
			status,
			payments,
			discountType,
			discount,
			shipping,
			subtotal,
			currency,
			clientRequestId,
			comments,
			balanceToUse
		},
		customerData: {
			personId,
			customerId,
			fullName,
			dni,
			email,
			phoneNumber,
			location,
			cityId
		}
	};
};
