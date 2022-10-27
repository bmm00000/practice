import { render, screen, fireEvent } from '@testing-library/react';

import Button from './Button';

describe('Button component', () => {
	it('should initially have red background color and text content "Change to blue", and change to blue background color and have text content "Change to red" when clicked', () => {
		render(<Button />);

		const buttonEl = screen.getByRole('button');

		expect(buttonEl).toHaveStyle({ backgroundColor: 'red' });
		expect(buttonEl).toHaveTextContent('Change to blue');

		fireEvent.click(buttonEl);

		expect(buttonEl).toHaveStyle({ backgroundColor: 'blue' });
		expect(buttonEl).toHaveTextContent('Change to red');
	});
});
