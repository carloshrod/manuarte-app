import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Checkbox, CheckboxProps, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import SearchCustomer from '@/components/admin/common/input-data/SearchCustomer';
import useDrawer from '@/hooks/useDrawer';
import { closeDrawer, updateDrawer } from '@/reducers/ui/uiSlice';
import { DrawerContent } from '@/types/enums';
import { ROUTES } from '@/utils/routes';
import { useMediaQuery } from 'react-responsive';

const CustomDrawer = () => {
	const {
		drawer: { isOpen, title, content, dataToEdit, noCustomer }
	} = useSelector((state: RootState) => state.ui);
	const dispatch = useDispatch();
	const { DRAWER_CONTENT } = useDrawer();
	const pathname = usePathname();
	const [checked, setChecked] = useState(false);
	const isMedium = useMediaQuery({ query: '(max-width: 1024px)' });

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

	const isTransactions = pathname === ROUTES.TRANSACTIONS;
	const showExtra =
		content === DrawerContent.quotes || content === DrawerContent.billings;

	return (
		<Drawer
			title={title}
			onClose={() => dispatch(closeDrawer())}
			keyboard={false}
			maskClosable={false}
			open={isOpen}
			getContainer={false}
			rootStyle={{
				position: 'absolute',
				marginTop: 1
			}}
			width={isTransactions && !isMedium ? '50%' : '100%'}
			height='100%'
			placement={isTransactions ? 'right' : 'top'}
			extra={
				!showExtra ? null : (
					<div className='flex gap-2 items-center'>
						{!noCustomer ? <SearchCustomer /> : null}
						{!dataToEdit || noCustomer ? (
							<Checkbox checked={checked} onChange={onChange}>
								Consumidor final
							</Checkbox>
						) : null}
					</div>
				)
			}
		>
			{drawerContent}
		</Drawer>
	);
};

export default CustomDrawer;
