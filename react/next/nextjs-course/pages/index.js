// our-domain.com
// apart from this file (index.js), regarding the other files (for example, news.js), we also have the option of creating a folder called 'news', and then an index.js file there, and still we will have that file rendered when we access 'our-domain.com/news' (this will allow us to create nested paths, eg. 'our-domain/news/something' will be rendered from something.js)

function HomePage() {
	return <h1>Home Page</h1>;
}

export default HomePage;
