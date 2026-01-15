export const mapQuoteBody = (body: SubmitQuoteDto) => {
	const {
		personId,
		customerId,
		shopSlug,
		shopId,
		stockId,
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
		cityId,
		currency,
		priceType
	} = body;

	return {
		quoteData: {
			shopSlug,
			shopId,
			stockId,
			items,
			status,
			discountType,
			discount,
			shipping,
			currency,
			priceType
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
		stockId,
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
		balanceToUse,
		priceType
	} = body;

	return {
		billingData: {
			shopSlug,
			shopId,
			stockId,
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
			balanceToUse,
			priceType
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
