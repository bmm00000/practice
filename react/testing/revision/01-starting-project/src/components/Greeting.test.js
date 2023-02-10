import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greeting from './Greeting';

describe('Greeting component', () => {
	it('should render "Hello World!"', () => {
		render(<Greeting />);

		const helloWorldElement = screen.getByText('Hello World', { exact: false });

		expect(helloWorldElement).toBeInTheDocument();
	});

	it('should render "Text has not changed yet" if the button was NOT clicked', () => {
		render(<Greeting />);

		const notChangedElement = screen.getByText('Text has not changed yet');

		expect(notChangedElement).toBeInTheDocument();
	});

	it('should render "Text has changed!" if the button WAS clicked', () => {
		render(<Greeting />);

		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement);

		const changedElement = screen.getByText('Text has changed', {
			exact: false,
		});

		expect(changedElement).toBeInTheDocument();
	});

	it('should NOT render "Text has not changed yet" if the button WAS clicked', () => {
		render(<Greeting />);

		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement);

		const notChangedElement = screen.queryByText('Text has not changed yet');

		expect(notChangedElement).toBeNull();
	});
});
