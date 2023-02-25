import { Outlet } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import PostList from '../components/PostList';

function Posts() {
	const posts = useLoaderData();

	return (
		<>
			<main>
				<Outlet />
				{posts.length > 0 && <PostList posts={posts} />}
				{posts.length === 0 && (
					<div style={{ textAlign: 'center' }}>
						<h2>There are no posts yet</h2>
						<p>Start adding some!</p>
					</div>
				)}
			</main>
		</>
	);
}

export default Posts;

export async function loader() {
	const fetchedData = await fetch('http://localhost:8080/posts');
	const fetchedPosts = await fetchedData.json();
	return fetchedPosts.posts;
}
