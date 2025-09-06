'use client';
import { useEffect, useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import AddButton from '../../common/ui/AddButton';
import { cashSessionServices } from '@/services/cashSessionServices';
import { ModalContent } from '@/types/enums';
import { useDispatch, useSelector } from 'react-redux';
import { setCashSession } from '@/reducers/cashSession/cashSessionSlice';
import { RiSafe2Fill, RiSafe2Line } from 'react-icons/ri';
import CashFlow from '../CashFlow';

const TabsFinancialFlow = ({ shopId }: { shopId: string | undefined }) => {
	const {
		currentCashSession: { canOpen, canRegisterMovements }
	} = useSelector((state: RootState) => state.cashSession);
	const [isLoading, setIsLoading] = useState(true);
	const [isCash, setIsCash] = useState(true);
	const dispatch = useDispatch();

	const fetchCashSession = async () => {
		if (shopId) {
			const data = await cashSessionServices.getOne(shopId);
			if (data) {
				dispatch(setCashSession(data));
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		fetchCashSession();
	}, [shopId]);

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Flujo de Caja',
			children: <CashFlow isLoading={isLoading} />
		},
		{
			key: '2',
			label: 'Transferencias Bancarias',
			children: <p>Transfers</p>
		}
	];

	const onChange = (key: string) => {
		setIsCash(key === '1');
	};

	const operations = isCash ? (
		<div className='flex gap-2 max-[460px]:flex-col'>
			{canOpen ? (
				<AddButton
					title='Apertura de Caja'
					modalContent={ModalContent.openCashSession}
					componentProps={{ shopId: shopId as string }}
					buttonLabel='Abrir Caja'
					addIcon={false}
					appendIcon={<RiSafe2Line size={18} />}
				/>
			) : (
				<AddButton
					title='Cierre de Caja'
					modalContent={ModalContent.closeCashSession}
					componentProps={{ shopId: shopId as string }}
					buttonLabel='Cerrar Caja'
					addIcon={false}
					appendIcon={<RiSafe2Fill size={18} />}
				/>
			)}

			{canRegisterMovements && (
				<>
					<AddButton
						title='Registrar Ingreso'
						modalContent={ModalContent.cashIncome}
						componentProps={{ shopId: shopId as string }}
						buttonLabel='Ingreso'
						appendIcon={<GiReceiveMoney size={18} />}
					/>
					<AddButton
						title='Registrar Gasto'
						modalContent={ModalContent.cashExpense}
						componentProps={{ shopId: shopId as string }}
						buttonLabel='Gasto'
						appendIcon={<GiPayMoney size={18} />}
					/>
				</>
			)}
		</div>
	) : null;

	return (
		<Tabs
			defaultActiveKey='1'
			items={items}
			tabBarExtraContent={isLoading ? undefined : operations}
			onChange={onChange}
		/>
	);
};

export default TabsFinancialFlow;
