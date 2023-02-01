import { render, screen } from '@testing-library/react';
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
