'use client';
import useTableColumns from '@/hooks/useTableColumns';
import CustomTable from '../../common/display-data/Table';
import { useEffect, useState } from 'react';
import { billingServices } from '@/services/billingServices';
import { useDispatch, useSelector } from 'react-redux';
import {
	setBillings,
	setFilteredBillings
} from '@/reducers/billings/billingSlice';
import { TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import moment from 'moment';
import { BillingStatus, ModalContent } from '@/types/enums';
import { shopServices } from '@/services/shopServices';
import { setShops } from '@/reducers/shops/shopSlice';
import { cashSessionServices } from '@/services/cashSessionServices';
import { setCashSession } from '@/reducers/cashSession/cashSessionSlice';
import { useModalStore } from '@/stores/modalStore';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/routes';

interface DataType {
	createdDate?: string;
	status?: string;
	[key: string]: any;
}

const BillingsTable = ({ shopSlug }: { shopSlug: string }) => {
	const {
		currentCashSession: { canRegisterMovements }
	} = useSelector((state: RootState) => state.cashSession);
	const { billingColumns } = useTableColumns();
	const { shops } = useSelector((state: RootState) => state.shop);
	const { billings } = useSelector((state: RootState) => state.billing);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const shopId = shops?.find(sh => sh?.slug === shopSlug)?.id;
	const { openModal } = useModalStore.getState();
	const router = useRouter();

	const fetchCashSession = async () => {
		if (shopId) {
			const data = await cashSessionServices.getOne(shopId);
			if (data) {
				dispatch(setCashSession(data));
			}
		}
	};

	useEffect(() => {
		fetchCashSession();

		if (canRegisterMovements !== undefined && !canRegisterMovements) {
			openModal({
				content: ModalContent.confirm,
				componentProps: {
					confirmTitle:
						'No puedes registrar movimientos porque la caja del día de hoy está cerrada',
					confirmText: '¿Quieres abrirla ahora?',
					onConfirm: () =>
						router.push(`${ROUTES.FINANCIAL_FLOW_SHOPS}/${shopSlug}`),
					isPromise: false
				}
			});
		}
	}, [shopId]);

	const fetchShops = async () => {
		if (shops?.length === 0) {
			const data = await shopServices.getAll(false);
			if (data) {
				dispatch(setShops(data));
			}
		}
	};

	const fetchBillings = async () => {
		if (shopSlug && billings.length === 0) {
			const data = await billingServices.getAll(shopSlug);
			dispatch(setBillings(data));
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchShops();
		fetchBillings();
	}, []);

	const filterBillings = (
		_pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>
	) => {
		const effectiveDateFilter = filters?.effectiveDate;

		if (!effectiveDateFilter || effectiveDateFilter.length === 0) {
			dispatch(setFilteredBillings([]));
			return;
		}

		let filtered: DataType[] = [...billings];

		filtered = filtered?.filter(
			item =>
				moment(item?.effectiveDate).format('YYYY-MM-DD') ===
				effectiveDateFilter[0]
		);

		filtered = filtered.filter(item => item.status === BillingStatus.PAID);

		dispatch(setFilteredBillings(filtered));
	};

	return (
		<CustomTable
			columns={billingColumns}
			dataSource={isLoading ? [] : billings}
			isLoading={isLoading}
			scrollMinus={335}
			filterData={filterBillings}
		/>
	);
};

export default BillingsTable;
