/* eslint-disable jsx-a11y/alt-text */
import { formatDate, formatToTitleCase } from '@/utils/formats';
import {
	Document,
	Page,
	Text,
	View,
	Image,
	StyleSheet
} from '@react-pdf/renderer';
import PDFTable from './PDFTable';
import PDFTermsCol from './PDFTermsCol';
import PDFTermsEcu from './PDFTermsEcu';
import { BILLING_STATUS_MAP, PAYMENT_METHOD_MAP } from '@/utils/mappings';
import { BillingStatus } from '@/types/enums';

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontSize: 10
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		marginBottom: 20
	},
	logo: {
		width: 100,
		height: 50
	},
	title: {
		flexDirection: 'row',
		alignItems: 'center',
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 20
	},
	notPaid: {
		flexDirection: 'row',
		alignItems: 'center',
		color: '#dc2626',
		padding: 2,
		border: '2px solid #dc2626',
		borderRadius: 4
	},
	docDetails: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 30,
		borderTop: '1px solid #ececec',
		borderLeft: '1px solid #ececec'
	},
	docDetailsRow: {
		display: 'flex',
		flexDirection: 'row'
	},
	docDetailsRowLabel: {
		width: '30%',
		fontWeight: 600,
		padding: 10,
		borderBottom: '1px solid #ececec',
		borderRight: '1px solid #ececec'
	},
	docDetailsRowValue: {
		width: '70%',
		padding: 10,
		borderBottom: '1px solid #ececec',
		borderRight: '1px solid #ececec'
	}
});

type Props = {
	isQuote: boolean;
	data: Quote | Billing;
	shopSlug: string;
};

const PDFDoc = ({ isQuote, data, shopSlug }: Props) => {
	const isNotPaid = !isQuote && data?.status !== BillingStatus.PAID;
	const city = shopSlug?.split('-')[1];

	return (
		<Document>
			<Page size='A4' style={styles.page} wrap>
				{/* Header */}
				<View style={styles.header}>
					<View>
						<Image src='/logo-manuarte.png' style={styles.logo} />
						<Text>www.manuartestore.com</Text>
					</View>
					<Image src='/logo-easy-soap.jpg' style={{ width: 150, height: 60 }} />
				</View>

				{/* Title */}
				<View style={styles.title}>
					<Text>
						{isQuote ? 'Cotización' : 'Factura'} #{data?.serialNumber}{' '}
					</Text>
					{isNotPaid && (
						<View style={styles.notPaid}>
							<Text>{BILLING_STATUS_MAP[data?.status]}</Text>
						</View>
					)}
				</View>

				{/* Doc Details */}
				<View style={styles.docDetails}>
					<View style={styles.docDetailsRow}>
						<Text style={styles.docDetailsRowLabel}>Cliente:</Text>
						<Text style={styles.docDetailsRowValue}>
							{formatToTitleCase(data?.fullName) || 'Consumidor Final'}
						</Text>
					</View>

					<View style={styles.docDetailsRow}>
						<Text style={styles.docDetailsRowLabel}>Documento:</Text>
						<Text style={styles.docDetailsRowValue}>{data?.dni || 'NA'}</Text>
					</View>

					<View style={styles.docDetailsRow}>
						<Text style={styles.docDetailsRowLabel}>Teléfono:</Text>
						<Text style={styles.docDetailsRowValue}>
							{data?.phoneNumber || 'NA'}
						</Text>
					</View>

					<View style={styles.docDetailsRow}>
						<Text style={styles.docDetailsRowLabel}>Dirección:</Text>
						<Text style={styles.docDetailsRowValue}>
							{formatToTitleCase(data?.location) || 'NA'}
						</Text>
					</View>

					<View style={styles.docDetailsRow}>
						<Text style={styles.docDetailsRowLabel}>Ciudad:</Text>
						<Text style={styles.docDetailsRowValue}>
							{formatToTitleCase(data?.cityName) ||
								formatToTitleCase(data?.city) ||
								'NA'}
						</Text>
					</View>

					<View style={styles.docDetailsRow}>
						<Text style={styles.docDetailsRowLabel}>Fecha:</Text>
						<Text style={styles.docDetailsRowValue}>
							{formatDate(data?.createdDate)}
						</Text>
					</View>

					{!isQuote && (
						<View style={styles.docDetailsRow}>
							<Text style={styles.docDetailsRowLabel}>Métodos de pago:</Text>
							<Text style={styles.docDetailsRowValue}>
								{(data as Billing)?.paymentMethods
									.map(p => {
										const paymenMethod = p.includes('TRANSFER')
											? 'Transferencia'
											: PAYMENT_METHOD_MAP[p];

										return formatToTitleCase(paymenMethod);
									})
									.join(', ')}
							</Text>
						</View>
					)}
				</View>

				{/* Table */}
				{data?.items?.length > 0 && <PDFTable data={data} />}

				{/* Terms */}
				{data?.countryIsoCode === 'CO' ? (
					<PDFTermsCol city={city === 'cascajal' ? 'barranquilla' : city} />
				) : (
					<PDFTermsEcu />
				)}
			</Page>
		</Document>
	);
};

export default PDFDoc;
