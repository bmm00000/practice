import React, { useRef } from 'react';

interface ShoppingListFormProps {
	onAddItem(item: string, quantity: number): void;
}

export default function ShoppingListForm({
	onAddItem,
}: ShoppingListFormProps): JSX.Element {
	const productInputRef = useRef<HTMLInputElement>(null);
	const quantityInputRef = useRef<HTMLInputElement>(null);

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const newProduct = productInputRef.current!.value;
		const newQuantity = parseInt(quantityInputRef.current!.value);
		onAddItem(newProduct, newQuantity);
		productInputRef.current!.value = '';
		quantityInputRef.current!.value = '1';
	};

	return (
		<form onSubmit={submitHandler}>
			<input
				type='text'
				placeholder='Type in your item...'
				ref={productInputRef}
			/>
			<input type='number' min={0} ref={quantityInputRef} />
			<button type='submit'>Add item</button>
		</form>
	);
}
