import { useRef, useState } from 'react';
import {
	Button,
	DatePicker,
	Input,
	InputRef,
	Space,
	TableColumnType,
	Tooltip
} from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { FilterFilled, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { RangePicker } = DatePicker;

const useTable = () => {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef<InputRef>(null);
	const [selectedDate, setSelectedDate] = useState<
		[Dayjs | null, Dayjs | null] | null
	>(null);

	const handleSearch = (
		selectedKeys: string[],
		confirm: FilterDropdownProps['confirm'],
		dataIndex: string
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText('');
	};

	const getColumnSearchProps = (
		dataIndex: string,
		localFilter: boolean = false
	): TableColumnType<any> => {
		const props: TableColumnType<any> = {
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
				close
			}) => (
				<div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
					<Input
						ref={searchInput}
						placeholder={`Buscar por ${String(dataIndex)}`}
						value={selectedKeys[0]}
						onChange={e =>
							setSelectedKeys(e.target.value ? [e.target.value] : [])
						}
						onPressEnter={() =>
							handleSearch(selectedKeys as string[], confirm, dataIndex)
						}
						style={{ marginBottom: 8, display: 'block' }}
					/>
					<Space>
						<Button
							type='primary'
							onClick={() =>
								handleSearch(selectedKeys as string[], confirm, dataIndex)
							}
							icon={<SearchOutlined />}
							size='small'
							style={{ width: 90 }}
						>
							Buscar
						</Button>
						<Button
							onClick={() => {
								clearFilters && handleReset(clearFilters);
								confirm();
							}}
							size='small'
							style={{ width: 90 }}
						>
							Limpiar
						</Button>
						<Button
							type='link'
							size='small'
							onClick={() => {
								close();
							}}
						>
							Cerrar
						</Button>
					</Space>
				</div>
			),
			filterIcon: (filtered: boolean) => (
				<SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
			),
			filterDropdownProps: {
				onOpenChange: visible => {
					if (visible) {
						setTimeout(() => searchInput.current?.select(), 100);
					}
				}
			},
			render: text =>
				searchedColumn === dataIndex ? (
					<Highlighter
						highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
						searchWords={[searchText]}
						autoEscape
						textToHighlight={text ? text.toString() : ''}
					/>
				) : (
					text
				)
		};

		if (localFilter) {
			props.onFilter = (value, record) => {
				const dataValue = record[dataIndex];
				return dataValue
					? dataValue
							.toString()
							.toLowerCase()
							.includes((value as string).toLowerCase())
					: false;
			};
		}

		return props;
	};

	const getColumnDateFilterProps = (
		dateField: 'createdDate' | 'effectiveDate',
		localFilter: boolean = false,
		filteredValue?: [Dayjs | null, Dayjs | null] | null
	): TableColumnType<any> => {
		const initialDate = filteredValue || selectedDate;

		const props: TableColumnType<any> = {
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters
			}) => (
				<div
					style={{ padding: 8 }}
					className='flex flex-col items-center gap-2'
				>
					<RangePicker
						placeholder={['Filtrar desde...', 'Filtrar hasta...']}
						value={initialDate}
						onChange={(dates, dateStrings) => {
							setSelectedDate(dates as [Dayjs | null, Dayjs | null]);
							setSelectedKeys(
								Array.isArray(dateStrings)
									? dateStrings.filter(Boolean)
									: dateStrings
										? [dateStrings]
										: []
							);
						}}
					/>
					<Space>
						<Button
							type='primary'
							onClick={() => {
								confirm();
							}}
							size='small'
							style={{ width: 90 }}
						>
							Filtrar
						</Button>
						<Button
							onClick={() => {
								clearFilters && clearFilters();
								confirm();
								setSelectedDate(null);
							}}
							size='small'
							style={{ width: 90 }}
						>
							Limpiar
						</Button>
					</Space>
				</div>
			),
			filterIcon: filtered => (
				<Tooltip title={'Filtrar por rango de fechas'}>
					<FilterFilled style={{ color: filtered ? '#1890ff' : undefined }} />
				</Tooltip>
			)
		};

		if (localFilter) {
			props.onFilter = (value, record) => {
				const recordDateBackup =
					dateField === 'effectiveDate'
						? record.createdDate
						: record.effectiveDate;

				const recordDate = record[dateField] || recordDateBackup;

				if (!recordDate) return false;

				const formattedRecordDate = dayjs(recordDate).format('YYYY-MM-DD');

				if (Array.isArray(value) && value.length === 2) {
					const [start, end] = value;
					if (start && end) {
						return (
							dayjs(formattedRecordDate).isSameOrAfter(dayjs(start)) &&
							dayjs(formattedRecordDate).isSameOrBefore(dayjs(end))
						);
					}
					if (start) {
						return dayjs(formattedRecordDate).isSameOrAfter(dayjs(start));
					}
					if (end) {
						return dayjs(formattedRecordDate).isSameOrBefore(dayjs(end));
					}
				} else if (typeof value === 'string') {
					return formattedRecordDate === value;
				}
				return false;
			};
		}

		return props;
	};

	return {
		getColumnSearchProps,
		getColumnDateFilterProps
	};
};

export default useTable;
