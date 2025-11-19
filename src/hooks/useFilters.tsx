import { useState } from 'react';
import { objectToSearchParams } from '@/utils/formats';
import { TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { useRouter } from 'next/navigation';

const useFilters = () => {
	const [tableFilters, setTableFilters] = useState<
		Record<string, FilterValue | null>
	>({});
	const router = useRouter();

	const updateFilterParams = (
		pagination: TablePaginationConfig,
		searchParams: Record<string, any>,
		filters: Record<string, FilterValue | null>
	) => {
		const params = objectToSearchParams(searchParams);

		params.set('page', String(pagination.current ?? 1));
		params.set('pageSize', String(pagination.pageSize ?? 10));

		Object.entries(filters).forEach(([key, value]) => {
			if (key.toLocaleLowerCase().includes('date')) {
				if (
					Array.isArray(value) &&
					value.length === 2 &&
					value[0] &&
					value[1]
				) {
					params.set('dateStart', String(value[0]));
					params.set('dateEnd', String(value[1]));
				} else {
					params.delete('dateStart');
					params.delete('dateEnd');
				}
			} else if (value && value.length > 0) params.set(key, String(value[0]));
			else params.delete(key);
		});

		router.replace(`?${params.toString()}`);
	};

	const synchronizeFilters = (filters: Record<string, any>) => {
		const initialFilters: Record<string, FilterValue | null> = {};

		Object.entries(filters).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				initialFilters[key] = [value];
			}
		});

		if (filters.dateStart && filters.dateEnd) {
			initialFilters.createdDate = [filters.dateStart, filters.dateEnd];
		}

		setTableFilters(initialFilters);
	};

	return { updateFilterParams, synchronizeFilters, tableFilters };
};

export default useFilters;
