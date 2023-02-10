import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

test('should render the name and email of a new user after clicking on the submit button', () => {
	render(<App />);

	const nameInput = screen.getByRole('textbox', { name: /name/i });
	const emailInput = screen.getByRole('textbox', { name: /email/i });
	const button = screen.getByRole('button');

	user.click(nameInput);
	user.keyboard('jane');
	user.click(emailInput);
	user.keyboard('jane@gmail.com');
	user.click(button);

	const name = screen.getByRole('cell', { name: 'jane' });
	const email = screen.getByRole('cell', { name: 'jane@gmail.com' });
	expect(name).toBeInTheDocument();
	expect(email).toBeInTheDocument();
});
