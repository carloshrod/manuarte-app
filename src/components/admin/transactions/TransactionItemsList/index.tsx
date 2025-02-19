import { Col } from 'antd';

const TransactionsItemList = ({ items }: { items: TransactionItem[] }) => {
	return items?.length > 0
		? items.map((item, index) => (
				<Col key={item.id} span={24}>
					<div className='flex justify-between'>
						<div className='flex flex-col flex-1 gap-1 '>
							{index === 0 ? <span>Nombre</span> : null}
							<span className='flex items-center h-[50px] px-3 py-1 border border-[#e5e5e5] rounded'>
								{`${item.productName} ${item.productVariantName}`}
							</span>
						</div>
						<div className='flex flex-col gap-1 w-[110px]'>
							{index === 0 ? <span>Cantidad</span> : null}
							<span className='flex items-center justify-center h-[50px] px-3 py-1 border border-[#e5e5e5] rounded'>
								{item.quantity}
							</span>
						</div>
					</div>
				</Col>
			))
		: null;
};

export default TransactionsItemList;
