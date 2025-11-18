import { objectToSearchParams } from '@/utils/formats';
import { TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { useRouter } from 'next/navigation';

const useFilters = () => {
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
			if (value && value.length > 0) params.set(key, String(value[0]));
			else params.delete(key);
		});

		router.replace(`?${params.toString()}`);
	};

	return { updateFilterParams };
};

export default useFilters;
