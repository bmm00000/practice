import { render, screen } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';

test('should render the data passed to the RepositoriesSummary', () => {
	const repository = {
		stargazers_count: 1,
		open_issues: 2,
		forks: 3,
		language: 'test-language',
	};
	render(<RepositoriesSummary repository={repository} />);

	for (let key in repository) {
		const value = repository[key];
		const element = screen.getByText(new RegExp(value));
		expect(element).toBeInTheDocument();
	}
});
