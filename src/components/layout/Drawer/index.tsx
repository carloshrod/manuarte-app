import useDrawer from '@/hooks/useDrawer';
import { closeDrawer } from '@/reducers/ui/uiSlice';
import { DrawerContent } from '@/types/enums';
import { Drawer } from 'antd';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CustomDrawer = () => {
	const {
		drawer: { isOpen, title, content }
	} = useSelector((state: RootState) => state.ui);
	const dispatch = useDispatch();
	const { DRAWER_CONTENT } = useDrawer();
	const pathname = usePathname();

	useEffect(() => {
		dispatch(closeDrawer());
	}, [pathname]);

	const drawerContent = DRAWER_CONTENT[content as DrawerContent] ?? null;

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
		>
			{drawerContent}
		</Drawer>
	);
};

export default CustomDrawer;
