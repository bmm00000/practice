import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greeting from './Greeting';

it('should render text "Hello!"', () => {
	render(<Greeting />);

	const helloElement = screen.getByText('Hello', { exact: false });

	expect(helloElement).toBeInTheDocument();
});

it('should render "Text1" if button was not clicked', () => {
	render(<Greeting />);

	const textElement = screen.getByText('Text1');

	expect(textElement).toBeInTheDocument();
});

it('should render "Text2" if button was clicked', () => {
	render(<Greeting />);

	const buttonElement = screen.getByRole('button');
	userEvent.click(buttonElement);

	const textElement = screen.getByText('Text2');
	expect(textElement).toBeInTheDocument();
});

it('should NOT render "text2" if button was NOT clicked', () => {});

it('should NOT render "text1" if buton was clicked', () => {});
