import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('should update subtotals when new quantity is added', async () => {
	const user = userEvent.setup();
	render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });

	const subtotal = screen.getByText('Scoops total', { exact: false });
	expect(subtotal).toHaveTextContent('0.00');

	const vanillaInput = await screen.findByRole('spinbutton', {
		name: 'Vanilla',
	});
	await user.clear(vanillaInput);
	await user.type(vanillaInput, '1');
	expect(subtotal).toHaveTextContent('2.00');

	const chocolateInput = await screen.findByRole('spinbutton', {
		name: 'Chocolate',
	});
	await user.clear(chocolateInput);
	await user.type(chocolateInput, '2');
	expect(subtotal).toHaveTextContent('6.00');
});
