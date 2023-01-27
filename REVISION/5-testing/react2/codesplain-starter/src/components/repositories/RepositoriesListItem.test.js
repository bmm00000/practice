import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import RepositoriesListItem from './RepositoriesListItem';

const renderComponent = () => {
	const repository = {
		full_name: 'repo-full-name',
		language: 'Javascript',
		description: 'repo-description',
		owner: { login: 'repo-owner' },
		name: 'repo-name',
		html_url: 'https://github.com',
	};
	render(
		<MemoryRouter>
			<RepositoriesListItem repository={repository} />
		</MemoryRouter>
	);

	return { repository };
};

test('should render the link of the github repo', async () => {
	const { repository } = renderComponent();

	await screen.findByRole('img', { name: 'Javascript' });

	const link = screen.getByRole('link', { name: 'github repo link' });
	expect(link).toHaveAttribute('href', repository.html_url);
});

test('shows a file icon with the appropriate icon', async () => {
	renderComponent();

	const icon = await screen.findByRole('img', { name: 'Javascript' });
	expect(icon).toHaveClass('js-icon');
});

test('shows a link to the code editor page', async () => {
	const { repository } = renderComponent();

	await screen.findByRole('img', { name: 'Javascript' });

	const link = await screen.findByRole('link', {
		name: new RegExp(repository.owner.login),
	});
	expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`);
});
