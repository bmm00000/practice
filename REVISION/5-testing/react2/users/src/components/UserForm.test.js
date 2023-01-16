import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('renders two inputs and a button', () => {
	render(<UserForm />);

	const inputs = screen.getAllByRole('textbox');
	const button = screen.getByRole('button');

	expect(inputs).toHaveLength(2);
	expect(button).toBeInTheDocument();
});

test('calls onAddUser with the correct arguments (name, email)', () => {
	const mock = jest.fn();
	render(<UserForm onAddUser={mock} />);

	const nameInput = screen.getByRole('textbox', { name: /name/i });
	user.click(nameInput);
	user.keyboard('jane');
	const emailInput = screen.getByRole('textbox', { name: /email/i });
	user.click(emailInput);
	user.keyboard('jane@gmail.com');
	const button = screen.getByRole('button');
	user.click(button);

	expect(mock).toHaveBeenCalled();
	expect(mock).toHaveBeenCalledWith({ name: 'jane', email: 'jane@gmail.com' });
});
