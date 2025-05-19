'use client';
import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { ROUTES } from '@/utils/routes';
import { setQuotes } from '@/reducers/quotes/quoteSlice';

const QuoteLayout = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname();
	const dispatch = useDispatch();

	useEffect(() => {
		if (pathname === ROUTES.QUOTE_SHOPS) {
			dispatch(setQuotes([]));
		}
	}, [pathname]);

	return <>{children}</>;
};

export default QuoteLayout;
