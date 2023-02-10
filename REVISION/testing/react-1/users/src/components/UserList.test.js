import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserList from './UserList';

const renderComponent = () => {
	const users = [
		{ name: 'jane', email: 'jane@gmail.com' },
		{ name: 'jo', email: 'jo@gmail.com' },
	];
	render(<UserList users={users} />);

	return { users };
};

test('render one row per user', () => {
	renderComponent();

	const rows = within(screen.getByTestId('users')).getAllByRole('row');

	expect(rows).toHaveLength(2);
});

test('render name and email of each user', () => {
	const { users } = renderComponent();

	for (let user of users) {
		const name = screen.getByRole('cell', { name: user.name });
		const email = screen.getByRole('cell', { name: user.email });

		expect(name).toBeInTheDocument();
		expect(email).toBeInTheDocument();
	}
});
