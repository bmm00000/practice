export const convertCamelColor = (color) => {
	return color.replace(/\B([A-Z])\B/g, ' $1');
};
