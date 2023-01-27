import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import RepositoriesListItem from './RepositoriesListItem';

const renderComponent = () => {
	const repository = {
		full_name: 'repo-full-name',
		language: 'repo-language',
		description: 'repo-description',
		owner: 'repo-owner',
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

	await screen.findByRole('img', { name: /repo-language/i });

	const link = screen.getByRole('link', { name: 'github repo link' });
	expect(link).toHaveAttribute('href', repository.html_url);
});
