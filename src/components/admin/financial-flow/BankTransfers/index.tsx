import { useSelector } from 'react-redux';
import CustomTable from '../../common/display-data/Table';
import useTableColumns from '@/hooks/useTableColumns';
import esES from 'antd/es/date-picker/locale/es_ES';
import moment, { Moment } from 'moment';
import 'moment/locale/es';

import generatePicker from 'antd/es/date-picker/generatePicker';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';

const DatePicker = generatePicker<Moment>(momentGenerateConfig);
moment.locale('es');

interface Props {
	isLoading: boolean;
	onChangeDate: (date: Moment) => void;
}

const BankTransfers = ({ isLoading, onChangeDate }: Props) => {
	const { bankTransferMovements } = useSelector(
		(state: RootState) => state.financialFlow
	);
	const { bankTransferMovementsColumns } = useTableColumns();

	return (
		<div className='space-y-4'>
			<div className='flex items-center gap-4 ps-3'>
				<DatePicker
					defaultValue={moment()}
					format={value => value.format('DD-MMM-YYYY').toUpperCase()}
					locale={esES}
					disabledDate={current => {
						return current && current > moment().endOf('day');
					}}
					onChange={onChangeDate}
					allowClear={false}
				/>
			</div>

			<CustomTable
				columns={bankTransferMovementsColumns}
				dataSource={isLoading ? [] : bankTransferMovements}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default BankTransfers;
