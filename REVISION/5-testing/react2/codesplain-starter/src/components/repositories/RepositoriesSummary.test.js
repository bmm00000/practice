import { render, screen } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';

test('should render the language of the repo', () => {
	const repository = {
		stargazers_count: 1,
		open_issues: 1,
		forks: 1,
		language: 'test-language',
	};
	render(<RepositoriesSummary repository={repository} />);

	const languageEl = screen.getByText('test-language');
	expect(languageEl).toBeInTheDocument();
});
