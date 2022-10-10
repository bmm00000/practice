// function makeColor(r, g, b) {
// 	const color = {};
// 	color.r = r;
// 	color.g = g;
// 	color.b = b;
// 	color.rgb = function () {
// 		const { r, g, b } = this;
// 		return `rgb(${r},${g},${b})`;
// 	};
// 	return color;
// }

// const color2 = makeColor(1, 2, 3);

function MakeColor(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
}

MakeColor.prototype.rgb = function () {
	const { r, g, b } = this;
	return `rgb(${r},${g},${b})`;
};

const color1 = new MakeColor(1, 2, 3);
const color2 = new MakeColor(4, 5, 6);

document.body.style.backgroundColor = color1.rgb();
