import { DrawerContent } from '@/types/enums';
import { ReactNode } from 'react';

const useDrawer = () => {
	const DRAWER_CONTENT: Record<DrawerContent, ReactNode> = {
		[DrawerContent.quotes]: <p>Quote Form</p>
	};

	return { DRAWER_CONTENT };
};

export default useDrawer;
