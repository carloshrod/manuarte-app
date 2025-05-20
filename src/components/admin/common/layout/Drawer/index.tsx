import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Checkbox, CheckboxProps, Drawer } from 'antd';
import SearchCustomer from '@/components/admin/common/input-data/SearchCustomer';
import useDrawer from '@/hooks/useDrawer';
import { DrawerContent } from '@/types/enums';
import { ROUTES } from '@/utils/routes';
import { useMediaQuery } from 'react-responsive';
import { useDrawerStore } from '@/stores/drawerStore';

const CustomDrawer = () => {
	const {
		isOpen,
		title,
		content,
		dataToHandle,
		noCustomer,
		updateDrawer,
		closeDrawer
	} = useDrawerStore();
	const { DRAWER_CONTENT } = useDrawer();
	const pathname = usePathname();
	const [checked, setChecked] = useState(false);
	const isMedium = useMediaQuery({ query: '(max-width: 1024px)' });

	useEffect(() => {
		closeDrawer();
	}, [pathname]);

	const drawerContent = DRAWER_CONTENT[content as DrawerContent] ?? null;

	const onChange: CheckboxProps['onChange'] = e => {
		if (!dataToHandle) {
			setChecked(e.target.checked);
			updateDrawer({ noCustomer: e.target.checked });
		}
	};

	useEffect(() => {
		setChecked(noCustomer as boolean);
	}, [noCustomer]);

	const isTransactions =
		pathname === ROUTES.TRANSACTIONS || pathname.includes('historial');

	const showExtra =
		content === DrawerContent.quotes || content === DrawerContent.billings;

	return (
		<Drawer
			title={title}
			onClose={closeDrawer}
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
						{!dataToHandle || noCustomer ? (
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
