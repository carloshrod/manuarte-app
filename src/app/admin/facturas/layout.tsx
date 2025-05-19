'use client';
import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { ROUTES } from '@/utils/routes';
import {
	setBillings,
	setFilteredBillings
} from '@/reducers/billings/billingSlice';

const BillingLayout = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname();
	const dispatch = useDispatch();

	useEffect(() => {
		if (pathname === ROUTES.BILLING_SHOPS) {
			dispatch(setBillings([]));
			dispatch(setFilteredBillings([]));
		}
	}, [pathname]);

	return <>{children}</>;
};

export default BillingLayout;
