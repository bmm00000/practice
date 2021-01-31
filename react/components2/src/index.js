import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetail from './CommentDetail';
import Card from './Card';

const App = () => {
	return (
		<>
			<Card>
				<h1>Hi there</h1>
				<p>Do you want to do this?</p>
			</Card>
			<Card>
				<CommentDetail
					author={faker.name.firstName()}
					imgSrc={faker.image.image()}
				/>
			</Card>
		</>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
