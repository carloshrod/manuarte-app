'use client';
import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setStockItems } from '@/reducers/stockItems/stockItemSlice';
import { ROUTES } from '@/utils/routes';

const StockLayout = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname();
	const dispatch = useDispatch();

	useEffect(() => {
		if (pathname === ROUTES.STOCKS) {
			dispatch(setStockItems([]));
		}
	}, [pathname]);

	return <>{children}</>;
};

export default StockLayout;
