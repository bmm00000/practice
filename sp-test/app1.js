const fs = require('fs');
const { get } = require('http');

try {
	const rawData = fs.readFileSync(process.env.PWD + '/webserver.log', 'utf-8');

	const parseData = (rawData) => {
		const data = [];
		const entries = rawData.split('\n');
		for (let entry of entries) {
			if (entry === '') {
				continue;
			}
			data.push(entry.split(' '));
		}
		return data;
	};

	const getTotalViews = (data) => {
		const totalViews = {};
		data.forEach((entry) => {
			const [path] = entry;
			totalViews[path] ? totalViews[path]++ : (totalViews[path] = 1);
		});
		return totalViews;
	};

	const getUsersByPath = (data) => {
		const usersByPath = {};
		data.forEach((entry) => {
			const [path, ip] = entry;
			if (!usersByPath[path]) {
				const pathUsers = [];
				pathUsers.push(ip);
				usersByPath[path] = pathUsers;
			} else {
				usersByPath[path].push(ip);
			}
		});
		return usersByPath;
	};

	const getUniqueUsersByPath = (usersByPath) => {
		const uniqueUsersByPath = {};
		for (let path in usersByPath) {
			const uniqueUsers = usersByPath[path].filter((user, i) => {
				return usersByPath[path].indexOf(user) === i;
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
			const [path, views] = entry;
			console.log(`${path}: ${views} views.`);
		});
	};

	const data = parseData(rawData);
	const totalViews = getTotalViews(data);
	const usersByPath = getUsersByPath(data);
	const uniqueUsersByPath = getUniqueUsersByPath(usersByPath);
	const uniqueViews = getUniqueViews(uniqueUsersByPath);

	const orderedUnique = order(uniqueViews);
	const orderedTotal = order(totalViews);

	printReport('Total views!', orderedTotal);
	printReport('Unique views!', orderedUnique);
} catch (e) {
	console.log(e);
}
