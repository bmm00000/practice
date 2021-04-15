import { useState, useEffect } from 'react';
import youtube from '../apis/youtube';

const useVideos = (defaultSearchTerm) => {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		search(defaultSearchTerm);
	}, [defaultSearchTerm]);

	const search = async (term) => {
		const response = await youtube.get('/search', {
			params: {
				q: term,
			},
		});
		setVideos(response.data.items);
	};

	return [videos, search];
	// we follow the React convention of const [] = useState, but we can also use the javascript convention:
	// {videos, search}
};

export default useVideos;

// DEPLOYMENT:
// see screenshots. static files (normal files that can exist inside a folder or directory) are in the deployment bundle.
// in this course we have been running create react app in development mode (there is a running development server)
// the deployment target is the service we use to deploy our application, such as vercel, netlify... the deployment target is going to take the static files of the deployment bundle, and it's going to host them.
// to deploy a react application, we don't need to run a virtual machine (for example, as I did with Carer). you only need a virtual machine if you are running an active server (a server that is running some code). we only need to host the static files.
