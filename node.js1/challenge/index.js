import { franc } from 'franc';
import langs from 'langs';
import colors from 'colors';

const text = process.argv[2];
const langInfo = franc(text);

if (langInfo === 'und') {
	// franc(''); // => 'und' (language code that stands for undetermined)
	console.log('This is not enough to know the language!'.red);
} else {
	const langObj = langs.where('2B', langInfo);
	console.log(`This is ${langObj.name}`.green);
}
