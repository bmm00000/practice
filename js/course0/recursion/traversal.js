const filesystem = {
	documents: {
		files: ['resume.pdf', 'myBook.txt'],
	},
	work: {
		urgent: {
			files: ['taxes.txt', 'payroll.pdf'],
		},
		lowPrio: {
			files: ['budget.txt'],
		},
	},
};

console.log(getFilenames(filesystem));

function getFilenames(fs) {
	const allFiles = [];
	for (const identifier in fs) {
		if (Array.isArray(fs[identifier])) {
			allFiles.push(...fs[identifier]);
		} else {
			allFiles.push(...getFilenames(fs[identifier]));
		}
	}
	return allFiles;
}
