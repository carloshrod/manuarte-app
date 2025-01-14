import SearchCustomer from '@/components/admin/quotes/SearchCustomer';
import useDrawer from '@/hooks/useDrawer';
import { closeDrawer, updateDrawer } from '@/reducers/ui/uiSlice';
import { DrawerContent } from '@/types/enums';
import { Checkbox, CheckboxProps, Drawer } from 'antd';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CustomDrawer = () => {
	const {
		drawer: { isOpen, title, content, dataToEdit, noCustomer }
	} = useSelector((state: RootState) => state.ui);
	const dispatch = useDispatch();
	const { DRAWER_CONTENT } = useDrawer();
	const pathname = usePathname();
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		dispatch(closeDrawer());
	}, [pathname]);

	const drawerContent = DRAWER_CONTENT[content as DrawerContent] ?? null;

	const onChange: CheckboxProps['onChange'] = e => {
		if (!dataToEdit) {
			setChecked(e.target.checked);
			dispatch(updateDrawer({ noCustomer: e.target.checked }));
		}
	};

	useEffect(() => {
		setChecked(noCustomer);
	}, [noCustomer]);

	return (
		<Drawer
			title={title}
			onClose={() => dispatch(closeDrawer())}
			open={isOpen}
			getContainer={false}
			rootStyle={{
				position: 'absolute',
				marginTop: 2
			}}
			width='100%'
			height='100%'
			placement='top'
			extra={
				<div className='flex gap-2 items-center'>
					{!noCustomer ? <SearchCustomer /> : null}
					{!dataToEdit || noCustomer ? (
						<Checkbox checked={checked} onChange={onChange}>
							Consumidor final
						</Checkbox>
					) : null}
				</div>
			}
		>
			{drawerContent}
		</Drawer>
	);
};

export default CustomDrawer;
