import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetail from './CommentDetail';
import Card from './Card';

const App = () => {
	return (
		<div class='ui cards'>
			<Card>
				<h2>Hey!</h2>
				<p>Are you sure?</p>
			</Card>
			<Card>
				<CommentDetail
					author={faker.name.firstName()}
					timeAgo='2 days'
					faves='2 Faves'
					text='Good article!'
					imgSrc={faker.image.image()}
				/>
			</Card>
			<Card>
				<CommentDetail
					author={faker.name.firstName()}
					timeAgo='3 days'
					faves='12 Faves'
					text='Not that great...'
					imgSrc={faker.image.image()}
				/>
			</Card>
			<Card>
				<CommentDetail
					author={faker.name.firstName()}
					timeAgo='5 days'
					faves='23 Faves'
					text='hmmmm...'
					imgSrc={faker.image.image()}
				/>
			</Card>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
