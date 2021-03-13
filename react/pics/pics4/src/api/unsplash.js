import axios from 'axios';

export default axios.create({
	baseURL: 'https://api.unsplash.com',
	headers: {
		Authorization: 'Client-ID QMROMEoumRLihjGUoq1xcsE8INb6P8GgnqOB25JrN9M',
	},
});
