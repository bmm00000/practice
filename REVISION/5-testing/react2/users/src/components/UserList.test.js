import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserList from './UserList';

test('render one row per user', () => {
	const users = [
		{ name: 'jane', email: 'jane@gmail.com' },
		{ name: 'jo', email: 'jo@gmail.com' },
	];
	render(<UserList users={users} />);

	const rows = within(screen.getByTestId('users')).getAllByRole('row');

	expect(rows).toHaveLength(2);
});
