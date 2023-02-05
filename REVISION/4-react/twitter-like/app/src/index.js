import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import NewPost from './components/NewPost';

const router = createBrowserRouter([
	{ path: '/', element: <App /> },
	{ path: '/new-post', element: <NewPost /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
