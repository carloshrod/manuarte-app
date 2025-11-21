import useTable from '@/hooks/useTable';
import { formatToTitleCase } from '@/utils/formats';
import { TableColumnsType } from 'antd';
import StaffActions from '../StaffActions';
import CopyableText from '../../common/ui/CopyableText';

const StaffCols = () => {
	const { getColumnSearchProps } = useTable();

	const staffColumns: TableColumnsType<Staff> = [
		{
			title: 'DOCUMENTO',
			dataIndex: 'dni',
			key: 'dni',
			...getColumnSearchProps('dni', true),
			render: value => <CopyableText text={value} />,
			width: 100
		},
		{
			title: 'NOMBRE',
			dataIndex: 'fullName',
			key: 'fullName',
			...getColumnSearchProps('fullName', true),
			width: 120
		},
		{
			title: 'EMAIL',
			dataIndex: 'email',
			key: 'email',
			...getColumnSearchProps('email', true),
			render: value => <CopyableText text={value} />,
			width: 140
		},
		{
			title: 'ROL',
			dataIndex: 'roleName',
			key: 'roleName',
			filters: [
				{
					text: 'Administrador',
					value: 'admin'
				},
				{
					text: 'Cajero',
					value: 'cajero'
				},
				{
					text: 'Bodeguero',
					value: 'bodeguero'
				}
			],
			onFilter: (value, record) =>
				record.roleName.indexOf(value as string) === 0,
			render: (value: string) => formatToTitleCase(value),
			width: 100
		},
		{
			title: 'ACCIONES',
			key: 'actions',
			className: 'actions',
			render: (_, record: Staff) => <StaffActions record={record} />,
			width: 100
		}
	];

	return { staffColumns };
};

export default StaffCols;
