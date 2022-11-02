import { createContext, useContext, useState } from 'react';

import { pricePerItem } from '../constants/index';

const OrderDetailsContext = createContext();

export function useOrderDetailsContext() {
	const orderDetailsCtx = useContext(OrderDetailsContext);

	if (!orderDetailsCtx) {
		throw new Error('You can only use this custom hook insdide of a provider!');
	}

	return orderDetailsCtx;
}

export function OrderDetailsContextProvider(props) {
	const [orderCounter, setOrderCounter] = useState({
		scoops: {},
		toppings: {},
	});

	function updateItemCount(item, count, type) {
		const newOrderCounter = { ...orderCounter };

		newOrderCounter[type][item] = count;

		setOrderCounter(newOrderCounter);
	}

	function resetOrder() {
		setOrderCounter({ scoops: {}, toppings: {} });
	}

	function calculateTotal(optionType) {
		const countArray = Object.values(orderCounter[optionType]);

		const totalQuantity = countArray.reduce((total, value) => total + value, 0);

		return totalQuantity * pricePerItem[optionType];
	}

	const totals = {
		scoops: calculateTotal('scoops'),
		toppings: calculateTotal('toppings'),
	};

	const value = { orderCounter, totals, updateItemCount, resetOrder };

	return <OrderDetailsContext.Provider value={value} {...props} />;
}
