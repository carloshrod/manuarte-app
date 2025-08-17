// components/pdf/PDFTable.tsx
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatCurrency } from '@/utils/formats';
import usePdf from '@/hooks/usePdf';

interface Props {
	data: Quote | Billing;
}

const styles = StyleSheet.create({
	tableContainer: {
		marginBottom: 50,
		width: '100%',
		fontSize: 10
	},
	tableRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 6
	},
	borderCell: {
		flexDirection: 'row',
		borderBottom: '1px solid #ececec'
	},
	header: {
		fontWeight: 'bold',
		borderBottom: '1px solid #ececec'
	},
	col: {
		paddingHorizontal: 4
	},
	col1: { width: '5%' },
	col2: { width: '40%' },
	col3: { width: '15%' },
	col4: { width: '20%' },
	col5: { width: '20%' },
	centerAlign: {
		textAlign: 'center'
	},
	bold: {
		fontWeight: 'bold'
	},
	resumeRow: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	resumeCell: {
		paddingVertical: 6
	}
});

const PDFTable = ({ data }: Props) => {
	const { calculateTotals } = usePdf();
	const items = data?.items;
	const { subtotal, discountValue, discountLabel, total } =
		calculateTotals(data);

	return (
		<View style={styles.tableContainer}>
			{/* Header */}
			<View style={[styles.tableRow, styles.header]}>
				<Text style={[styles.col, styles.col1]}>#</Text>
				<Text style={[styles.col, styles.col2]}>PRODUCTO</Text>
				<Text style={[styles.col, styles.col3, styles.centerAlign]}>
					CANTIDAD
				</Text>
				<Text style={[styles.col, styles.col4]}>PRECIO</Text>
				<Text style={[styles.col, styles.col5]}>TOTAL PRODUCTO</Text>
			</View>

			{/* Items */}
			{items.map((item, index) => (
				<View key={item.id} style={[styles.tableRow, styles.borderCell]}>
					<Text style={[styles.col, styles.col1]}>{index + 1}</Text>
					<Text style={[styles.col, styles.col2]}>{item.name}</Text>
					<Text style={[styles.col, styles.col3, styles.centerAlign]}>
						{item.quantity}
					</Text>
					<Text style={[styles.col, styles.col4]}>
						{formatCurrency(item.price)}
					</Text>
					<Text style={[styles.col, styles.col5]}>
						{formatCurrency(item.totalPrice)}
					</Text>
				</View>
			))}

			{/* Resume */}
			<View style={styles.resumeRow}>
				<Text style={[styles.col, styles.col1]}></Text>
				<Text style={[styles.col, styles.col2]}></Text>
				<Text style={[styles.col, styles.col3]}></Text>
				<Text
					style={[
						styles.col,
						styles.col4,
						styles.bold,
						styles.borderCell,
						styles.resumeCell
					]}
				>
					SUBTOTAL
				</Text>
				<Text
					style={[
						styles.col,
						styles.col5,
						styles.borderCell,
						styles.resumeCell
					]}
				>
					{formatCurrency(subtotal)}
				</Text>
			</View>

			<View style={styles.resumeRow}>
				<Text style={[styles.col, styles.col1]}></Text>
				<Text style={[styles.col, styles.col2]}></Text>
				<Text style={[styles.col, styles.col3]}></Text>
				<Text
					style={[
						styles.col,
						styles.col4,
						styles.bold,
						styles.borderCell,
						styles.resumeCell
					]}
				>
					{discountLabel}
				</Text>
				<Text
					style={[
						styles.col,
						styles.col5,
						styles.borderCell,
						styles.resumeCell
					]}
				>
					{formatCurrency(discountValue)}
				</Text>
			</View>

			<View style={styles.resumeRow}>
				<Text style={[styles.col, styles.col1]}></Text>
				<Text style={[styles.col, styles.col2]}></Text>
				<Text style={[styles.col, styles.col3]}></Text>
				<Text
					style={[
						styles.col,
						styles.col4,
						styles.bold,
						styles.borderCell,
						styles.resumeCell
					]}
				>
					FLETE
				</Text>
				<Text
					style={[
						styles.col,
						styles.col5,
						styles.borderCell,
						styles.resumeCell
					]}
				>
					{formatCurrency(data?.shipping) ?? 0}
				</Text>
			</View>

			<View style={styles.resumeRow}>
				<Text style={[styles.col, styles.col1]}></Text>
				<Text style={[styles.col, styles.col2]}></Text>
				<Text style={[styles.col, styles.col3]}></Text>
				<Text
					style={[
						styles.col,
						styles.col4,
						styles.bold,
						styles.borderCell,
						styles.resumeCell
					]}
				>
					TOTAL
				</Text>
				<Text
					style={[
						styles.col,
						styles.col5,
						styles.borderCell,
						styles.resumeCell
					]}
				>
					{formatCurrency(total)}
				</Text>
			</View>
		</View>
	);
};

export default PDFTable;
