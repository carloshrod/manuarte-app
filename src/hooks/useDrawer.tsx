import BillingForm from '@/components/admin/billings/BillingForm';
import QuoteForm from '@/components/admin/quotes/QuoteForm';
import TransactionDetails from '@/components/admin/transactions/TransactionDetails';
import TransactionsForm from '@/components/admin/transactions/TransactionsForm';
import RecentActivityDetails from '@/components/admin/users/RecentActivityDetails';
import { DrawerContent } from '@/types/enums';
import { ReactNode } from 'react';

const useDrawer = () => {
	const DRAWER_CONTENT: Record<DrawerContent, ReactNode> = {
		[DrawerContent.quotes]: <QuoteForm />,
		[DrawerContent.billings]: <BillingForm />,
		[DrawerContent.preOrder]: <BillingForm />,
		[DrawerContent.directEnter]: <TransactionsForm />,
		[DrawerContent.transfer]: <TransactionsForm />,
		[DrawerContent.enterByTransfer]: <TransactionsForm />,
		[DrawerContent.exit]: <TransactionsForm />,
		[DrawerContent.transactionDetails]: <TransactionDetails />,
		[DrawerContent.transactionHistoryDetails]: <TransactionDetails />,
		[DrawerContent.recentActivityDetails]: <RecentActivityDetails />
	};

	return { DRAWER_CONTENT };
};

export default useDrawer;
