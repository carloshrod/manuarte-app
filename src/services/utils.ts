export const mapQuoteBody = (body: SubmitQuoteDto) => {
	const {
		personId,
		customerId,
		shopSlug,
		shopId,
		items,
		status,
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
		paymentMethod,
		shipping,
		total,
		currency,
		fullName,
		dni,
		email,
		phoneNumber,
		location,
		cityId,
		clientRequestId
	} = body;

	return {
		billingData: {
			shopSlug,
			shopId,
			items,
			status,
			paymentMethod,
			shipping,
			total,
			currency,
			clientRequestId
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
