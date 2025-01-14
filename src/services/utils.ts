export const mapQuoteBody = (body: SubmitQuoteDto) => {
	const {
		personId,
		customerId,
		shopSlug,
		shopId,
		items,
		status,
		dueDate,
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
			dueDate,
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
