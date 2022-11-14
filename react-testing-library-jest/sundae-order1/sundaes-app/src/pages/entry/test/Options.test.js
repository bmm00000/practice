import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('displays the scoop images sent by the server', async () => {
	render(<Options optionType='scoops' />);

	const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
	const scoopImagesAlt = scoopImages.map((image) => image.alt);
	expect(scoopImagesAlt).toHaveLength(2);
	expect(scoopImagesAlt).toEqual(['Vanilla scoop', 'Chocolate scoop']);
});

test('displays the topping images sent by the server', async () => {
	render(<Options optionType='toppings' />);

	const toppingImages = await screen.findAllByRole('img', {
		name: /topping$/i,
	});
	const toppingImagesAlt = toppingImages.map((image) => image.alt);
	expect(toppingImagesAlt).toHaveLength(3);
	expect(toppingImagesAlt).toEqual([
		'Berries topping',
		'Choco fudge topping',
		'M&Ms topping',
	]);
});
