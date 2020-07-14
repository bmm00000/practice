function average(scores) {
	let total = 0;
	for (let i = 0; i < scores.length; i++) {
		total += scores[i];
	}
	return Math.round(total / scores.length);
}

const scores1 = [ 2, 3, 4, 5, 5 ];
const scores2 = [ 5, 3, 4, 3, 5 ];

console.log(average(scores1));
console.log(average(scores2));
