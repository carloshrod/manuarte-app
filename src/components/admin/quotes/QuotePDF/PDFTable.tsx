const PDFTable = ({ items }: { items: QuoteItem[] }) => {
	const total = items.reduce((acc, item) => {
		return acc + parseFloat(item.totalPrice);
	}, 0);

	return (
		<div>
			<table className='w-full border-collapse text-left'>
				<thead>
					<tr className='border-b-2'>
						<th className='px-4 py-2'>#</th>
						<th className='px-4 py-2'>PRODUCTO</th>
						<th className='px-4 py-2'>CANTIDAD</th>
						<th className='px-4 py-2'>PRECIO</th>
						<th className='px-4 py-2'>TOTAL PRODUCTO</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, index) => (
						<tr key={item.id} className='border-b-2'>
							<td className='px-4 py-2'>{index + 1}</td>
							<td className='px-4 py-2'>{item.name}</td>
							<td className='px-4 py-2'>{item.quantity}</td>
							<td className='px-4 py-2'>${item.price}</td>
							<td className='px-4 py-2'>${item.totalPrice}</td>
						</tr>
					))}
				</tbody>
				<tbody>
					<tr>
						<td rowSpan={3} colSpan={3}></td>
						<td className='px-4 py-2 font-bold border-b-2'>SUBTOTAL</td>
						<td className='px-4 py-2 border-b-2'>${total}</td>
					</tr>
					<tr>
						<td className='px-4 py-2 font-bold border-b-2'>IVA 0%</td>
						<td className='px-4 py-2 border-b-2'>$0</td>
					</tr>
					<tr>
						<td className='px-4 py-2 font-bold border-b-2'>TOTAL</td>
						<td className='px-4 py-2 border-b-2'>${total}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default PDFTable;
