const fs = require('fs');

try {
	// FIX THE PATH NAME!!
	// REFACTOR [0] WITH ARRAY DECONSTRUCTION
	const rawData = fs.readFileSync(
		'/Users/Boix/Desktop/practice/legacy/sp-test/webserver.log',
		'utf8'
	);

	const dataArr = [];
	const arr = rawData.split('\n');
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === '') {
			continue;
		}
		const inArr = arr[i].split(' ');
		dataArr.push(inArr);
	}

	// List of webpages with total page views ordered from most to least page views:

	const logSummary = {};
	dataArr.forEach((elem) => {
		if (logSummary[elem[0]]) {
			logSummary[elem[0]]++;
		} else {
			logSummary[elem[0]] = 1;
		}
	});

	// POSSIBLE A HELPER FUNCTION TO ORDER??
	const sorting = [];
	for (let path in logSummary) {
		sorting.push([path, logSummary[path]]);
	}

	sorting.sort(function (a, b) {
		return b[1] - a[1];
	});

	console.log(
		'List of webpages with total page views ordered from most to least page views:'
	);

	sorting.forEach((pair) => {
		const [path, visits] = pair;
		console.log(`${path}: ${visits} visits.`);
	});

	// List of webpages with total unique page views also ordered from most to least page views:

	const usersLogSummary = {};
	dataArr.forEach((elem) => {
		if (usersLogSummary[elem[0]]) {
			usersLogSummary[elem[0]].push(elem[1]);
		} else {
			const pathUsers = [];
			pathUsers.push(elem[1]);
			usersLogSummary[elem[0]] = pathUsers;
		}
	});

	const uniqueUsersLogSummary = {};
	for (let path in usersLogSummary) {
		const uniqueUsers = usersLogSummary[path].filter((item, index) => {
			return usersLogSummary[path].indexOf(item) === index;
		});
		uniqueUsersLogSummary[path] = uniqueUsers;
	}

	const uniqueVisits = {};
	for (let path in uniqueUsersLogSummary) {
		uniqueVisits[path] = uniqueUsersLogSummary[path].length;
	}

	// POSSIBLE A HELPER FUNCTION TO ORDER??
	const sortingT = [];
	for (let path in uniqueVisits) {
		sortingT.push([path, uniqueVisits[path]]);
	}

	sortingT.sort(function (a, b) {
		return b[1] - a[1];
	});

	console.log(
		'List of webpages with total unique page views also ordered from most to least page views:'
	);

	sortingT.forEach((pair) => {
		const [path, number] = pair;
		console.log(`${path}: ${number} unique visits.`);
	});
} catch (err) {
	console.error(err);
}
