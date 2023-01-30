import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { SWRConfig } from 'swr';
import { createServer } from '../../test/server';
import AuthButtons from './AuthButtons';

async function renderComponent() {
	render(
		<SWRConfig value={{ provider: () => new Map() }}>
			<MemoryRouter>
				<AuthButtons />
			</MemoryRouter>
		</SWRConfig>
	);
	await screen.findAllByRole('link');
}

describe('when user is not authenticated', () => {
	createServer([
		{
			path: '/api/user',
			res: (req, res, ctx) => {
				return { user: null };
			},
		},
	]);

	test('sign in and sign up buttons should appear', async () => {
		await renderComponent();

		const signInButton = screen.getByRole('link', { name: /sign in/i });
		const signUpButton = screen.getByRole('link', { name: /sign up/i });

		expect(signInButton).toBeInTheDocument();
		expect(signInButton).toHaveAttribute('href', '/signin');
		expect(signUpButton).toBeInTheDocument();
		expect(signUpButton).toHaveAttribute('href', '/signup');
	});

	test('sign out button should not appear', async () => {
		await renderComponent();

		const signOutButton = screen.queryByRole('link', { name: /sign out/i });

		expect(signOutButton).not.toBeInTheDocument();
	});
});

describe('when user is authenticated', () => {
	createServer([
		{
			path: '/api/user',
			res: (req, res, ctx) => {
				return { user: { id: 1, email: 'jose@test.com' } };
			},
		},
	]);

	test('sign in and sign up buttons should not appear', async () => {
		await renderComponent();

		const signInButton = screen.queryByRole('link', { name: /sign in/i });
		const signUpButton = screen.queryByRole('link', { name: /sign up/i });

		expect(signInButton).not.toBeInTheDocument();
		expect(signUpButton).not.toBeInTheDocument();
	});

	test('sign out button should appear', async () => {
		await renderComponent();

		const signOutButton = screen.getByRole('link', { name: /sign out/i });

		expect(signOutButton).toBeInTheDocument();
	});
});
