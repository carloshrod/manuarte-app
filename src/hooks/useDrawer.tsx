import BillingForm from '@/components/admin/billings/BillingForm';
import QuoteForm from '@/components/admin/quotes/QuoteForm';
import TransactionsForm from '@/components/admin/transactions/TransactionsForm';
import { DrawerContent } from '@/types/enums';
import { ReactNode } from 'react';

const useDrawer = () => {
	const DRAWER_CONTENT: Record<DrawerContent, ReactNode> = {
		[DrawerContent.quotes]: <QuoteForm />,
		[DrawerContent.billings]: <BillingForm />,
		[DrawerContent.enterBySupplier]: <TransactionsForm />,
		[DrawerContent.transfer]: <TransactionsForm />,
		[DrawerContent.enter]: <TransactionsForm />,
		[DrawerContent.exit]: <TransactionsForm />
	};

	return { DRAWER_CONTENT };
};

export default useDrawer;
