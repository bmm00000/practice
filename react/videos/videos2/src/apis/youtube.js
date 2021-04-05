import axios from 'axios';

const KEY = 'AIzaSyBGKy7jlYUTNPEkxT-b10-SWXyTHPMxBVU';

export default axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3',
	params: {
		part: 'snippet',
		maxResults: 5,
		type: 'video',
		key: KEY,
	},
});
