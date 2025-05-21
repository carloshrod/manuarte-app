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
		city
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
			city
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
		city,
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
			city
		}
	};
};
