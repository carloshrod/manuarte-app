import { useRef, useState } from 'react';
import {
	Button,
	DatePicker,
	Input,
	InputRef,
	Space,
	TableColumnType
} from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment, { Moment } from 'moment';

const useTable = () => {
	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef<InputRef>(null);
	const [selectedDate, setSelectedDate] = useState<Moment | null>(null);

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

	const getColumnSearchProps = (dataIndex: string): TableColumnType<any> => ({
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
		onFilter: (value, record) => {
			const dataValue = record[dataIndex];
			return dataValue
				? dataValue
						.toString()
						.toLowerCase()
						.includes((value as string).toLowerCase())
				: false;
		},
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
	});

	const getColumnDateFilterProps = (
		dateField: 'createdDate' | 'updatedDate'
	): TableColumnType<any> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters
		}) => (
			<div style={{ padding: 8 }}>
				<DatePicker
					placeholder='Seleccionar fecha...'
					value={selectedDate}
					onChange={(date: Moment | null, dateString: string | string[]) => {
						setSelectedDate(date);
						setSelectedKeys(
							Array.isArray(dateString)
								? dateString.filter(Boolean)
								: dateString
									? [dateString]
									: []
						);
					}}
					style={{ marginBottom: 8, display: 'block' }}
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
		onFilter: (value, record) => {
			const recordDate = record[dateField];
			return moment(recordDate).format('YYYY-MM-DD') === value;
		}
	});

	return {
		getColumnSearchProps,
		getColumnDateFilterProps
	};
};

export default useTable;
