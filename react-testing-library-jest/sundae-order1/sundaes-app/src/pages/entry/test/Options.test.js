import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('displays the scoop images sent by the server', async () => {
	render(<Options optionType='scoops' />);

	const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
	const scoopImagesAlt = scoopImages.map((image) => image.alt);
	expect(scoopImagesAlt).toHaveLength(2);
	expect(scoopImagesAlt).toEqual(['Vanilla scoop', 'Chocolate scoop']);
});
