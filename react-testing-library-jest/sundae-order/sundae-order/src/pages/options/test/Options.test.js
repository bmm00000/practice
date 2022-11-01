import { render, screen } from '@testing-library/react';

import Options from '../Options';

test('should yield all scoop flavours', async () => {
	render(<Options optionType='scoops' />);

	const imageList = await screen.findAllByRole('img', { name: /scoop$/i });
	expect(imageList).toHaveLength(2);

	const imageNames = imageList.map((image) => image.alt);
	expect(imageNames).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});
