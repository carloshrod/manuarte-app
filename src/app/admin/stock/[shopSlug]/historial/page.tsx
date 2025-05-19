import StockItemHistory from '@/components/admin/stock/StockItemHistory';

interface StockItemHistoryPageProps {
	params: { shopSlug: string };
	searchParams: { stockItemId?: string };
}

const StockItemHistoryPage = ({
	params: { shopSlug },
	searchParams
}: StockItemHistoryPageProps) => {
	const shopName = shopSlug.toUpperCase().replace('-', ' ');
	const stockItemId = searchParams.stockItemId;

	return (
		<StockItemHistory shopName={shopName} stockItemId={stockItemId as string} />
	);
};

export default StockItemHistoryPage;
