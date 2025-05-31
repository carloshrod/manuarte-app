import { formatCurrency, formatDate } from '@/utils/formats';
import { Card, Col, Row, Statistic } from 'antd';
import { BiDollar } from 'react-icons/bi';
import { BsCalendarDate } from 'react-icons/bs';
import { PiInvoice } from 'react-icons/pi';
import { TbFileDollar } from 'react-icons/tb';

const CustomerStats = ({
	billingsCount,
	billings,
	quotesCount,
	totalSpent
}: {
	billingsCount: number;
	billings: Billing[];
	quotesCount: string;
	totalSpent: string;
}) => {
	return (
		<Row gutter={[16, 16]}>
			<Col xs={24} lg={12}>
				<Card
					style={{
						boxShadow: '-4px 4px 12px rgba(0, 0, 0, 0.1)',
						borderRadius: 8
					}}
				>
					<Statistic
						title={<span className='font-bold'>Compras</span>}
						value={billingsCount}
						prefix={<PiInvoice color='#10b981' />}
					/>
				</Card>
			</Col>
			<Col xs={24} lg={12}>
				<Card
					style={{
						boxShadow: '-4px 4px 12px rgba(0, 0, 0, 0.1)',
						borderRadius: 8
					}}
				>
					<Statistic
						title={<span className='font-bold'>Cotizaciones sin facturar</span>}
						value={quotesCount}
						prefix={<TbFileDollar color='#0D6EFD' />}
					/>
				</Card>
			</Col>
			<Col xs={24} lg={12}>
				<Card
					style={{
						boxShadow: '-4px 4px 12px rgba(0, 0, 0, 0.1)',
						borderRadius: 8
					}}
				>
					<Statistic
						title={<span className='font-bold'>Total gastado</span>}
						value={formatCurrency(totalSpent).slice(1)}
						prefix={<BiDollar color='#10b981' />}
					/>
				</Card>
			</Col>
			{billingsCount > 0 ? (
				<Col xs={24} lg={12}>
					<Card
						style={{
							boxShadow: '-4px 4px 12px rgba(0, 0, 0, 0.1)',
							borderRadius: 8
						}}
					>
						<Statistic
							title={<span className='font-bold'>Última compra</span>}
							value={formatDate(billings[0]?.createdDate)}
							prefix={<BsCalendarDate color='#0D6EFD' />}
						/>
					</Card>
				</Col>
			) : null}
		</Row>
	);
};

export default CustomerStats;
