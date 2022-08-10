import React, { useRef } from 'react';

interface ShoppingListFormProps {
	onAddItem: (product: string, quantity: number) => void;
}

export default function ShoppingListForm({
	onAddItem,
}: ShoppingListFormProps): JSX.Element {
	const productInputRef = useRef<HTMLInputElement>(null);
	const quantityInputRef = useRef<HTMLInputElement>(null);

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		onAddItem(
			productInputRef.current!.value,
			parseInt(quantityInputRef.current!.value)
		);
	};

	return (
		<form action='' onSubmit={submitHandler}>
			<input type='text' placeholder='Product name...' ref={productInputRef} />
			<input type='number' ref={quantityInputRef} min={0} />
			<button type='submit'>Add item</button>
		</form>
	);
}
