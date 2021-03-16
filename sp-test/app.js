const fs = require('fs');

try {
	const rawData = fs.readFileSync(process.env.PWD + '/webserver.log', 'utf8');

	const parseData = (rawData) => {
		const data = [];
		const entries = rawData.split('\n');
		for (let i = 0; i < entries.length; i++) {
			if (entries[i] === '') {
				continue;
			}
			const entry = entries[i].split(' ');
			data.push(entry);
		}
		return data;
	};

	const getTotalViews = (data) => {
		const totalViews = {};
		data.forEach((entry) => {
			const [path] = entry;
			if (totalViews[path]) {
				totalViews[path]++;
			} else {
				totalViews[path] = 1;
			}
		});
		return totalViews;
	};

	const getUsersByPath = (data) => {
		const usersByPath = {};
		data.forEach((entry) => {
			const [path, ip] = entry;
			if (usersByPath[path]) {
				usersByPath[path].push(ip);
			} else {
				const pathUsers = [];
				pathUsers.push(ip);
				usersByPath[path] = pathUsers;
			}
		});
		return usersByPath;
	};

	const getUniqueUsersByPath = (usersByPath) => {
		const uniqueUsersByPath = {};
		for (let path in usersByPath) {
			const uniqueUsers = usersByPath[path].filter((item, index) => {
				return usersByPath[path].indexOf(item) === index;
			});
			uniqueUsersByPath[path] = uniqueUsers;
		}
		return uniqueUsersByPath;
	};

	const getUniqueViews = (uniqueUsersByPath) => {
		const uniqueViews = {};
		for (let path in uniqueUsersByPath) {
			uniqueViews[path] = uniqueUsersByPath[path].length;
		}
		return uniqueViews;
	};

	const order = (views) => {
		const sorting = [];
		for (let path in views) {
			sorting.push([path, views[path]]);
		}
		sorting.sort(function (a, b) {
			return b[1] - a[1];
		});
		return sorting;
	};

	const printReport = (message, orderedArr) => {
		console.log(message);
		orderedArr.forEach((entry) => {
			const [path, visits] = entry;
			console.log(`${path}: ${visits} visits.`);
		});
	};

	const data = parseData(rawData);
	const totalViews = getTotalViews(data);
	const usersByPath = getUsersByPath(data);
	const uniqueUsersByPath = getUniqueUsersByPath(usersByPath);
	const uniqueViews = getUniqueViews(uniqueUsersByPath);

	const orderedTotal = order(totalViews);
	const orderedUnique = order(uniqueViews);

	const messageTotalViews =
		'List of webpages with total page views ordered from most to least page views:';
	const messageUniqueViews =
		'List of webpages with total unique page views also ordered from most to least page views:';

	printReport(messageTotalViews, orderedTotal);
	printReport(messageUniqueViews, orderedUnique);
} catch (err) {
	console.error(err);
}
