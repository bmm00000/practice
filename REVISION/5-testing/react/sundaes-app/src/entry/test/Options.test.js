import { findAllByRole, render, screen } from '@testing-library/react';
import Options from '../Options';

test('should render the images of the scoops', async () => {
	render(<Options optionType='scoop' />);

	const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
	expect(scoopImages).toHaveLength(4);

	const scoopAltImages = scoopImages.map((image) => image.alt);
	expect(scoopAltImages).toEqual([
		'Mint chip scoop',
		'Vanilla scoop',
		'Chocolate scoop',
		'Salted caramel scoop',
	]);
});

test('should render the images of the toppings', async () => {
	render(<Options optionType='topping' />);

	const toppingImages = await screen.findAllByRole('img', {
		name: /topping$/i,
	});
	expect(toppingImages).toHaveLength(6);

	const toppingImagesAlt = toppingImages.map((image) => image.alt);
	expect(toppingImagesAlt).toEqual([
		'M&Ms topping',
		'Hot fudge topping',
		'Peanut butter cups topping',
		'Gummi bears topping',
		'Mochi topping',
		'Cherries topping',
	]);
});
