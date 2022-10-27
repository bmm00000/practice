import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greeting from './Greeting';

describe('Greeting component', () => {
	it('should render "Hello there" on the screen', () => {
		render(<Greeting />);
		const greetingElement = screen.getByText('Hello there', { exact: false });

		expect(greetingElement).toBeInTheDocument();
	});

	it('should render "Text hasnt changed" if button was NOT clicked', () => {
		render(<Greeting />);

		const paragraphElement = screen.getByText("Text hasn't changed", {
			exact: false,
		});

		expect(paragraphElement).toBeInTheDocument();
	});

	it('should render "Text has changed" if button WAS clicked', () => {
		render(<Greeting />);

		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement);

		const paragraphElement = screen.getByText('Text has changed');
		expect(paragraphElement).toBeInTheDocument();
	});

	it('should NOT render "Text hasnt changed" if button WAS clicked', () => {
		render(<Greeting />);

		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement);

		const paragraphElement = screen.queryByText("Text hasn't changed");
		expect(paragraphElement).toBeNull();
	});
});
