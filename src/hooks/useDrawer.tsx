import BillingForm from '@/components/admin/billings/BillingForm';
import QuoteForm from '@/components/admin/quotes/QuoteForm';
import { DrawerContent } from '@/types/enums';
import { ReactNode } from 'react';

const useDrawer = () => {
	const DRAWER_CONTENT: Record<DrawerContent, ReactNode> = {
		[DrawerContent.quotes]: <QuoteForm />,
		[DrawerContent.billings]: <BillingForm />
	};

	return { DRAWER_CONTENT };
};

export default useDrawer;
