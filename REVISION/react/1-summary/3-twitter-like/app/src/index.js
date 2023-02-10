import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './routes/RootLayout';
import Posts from './routes/Posts';
import NewPost from './routes/NewPost';
import PostDetails from './routes/PostDetails';
import { loader as postsLoader } from './routes/Posts';
import { loader as detailsLoader } from './routes/PostDetails';
import { action as postsAction } from './routes/NewPost';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: <Posts />,
				loader: postsLoader,
				children: [
					{ path: '/new-post', element: <NewPost />, action: postsAction },
					{ path: '/:id', element: <PostDetails />, loader: detailsLoader },
				],
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
