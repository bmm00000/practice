import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetail from './CommentDetail';
import Card from './Card';

const App = () => {
	return (
		<>
			<Card>Hello!</Card>
			<Card>
				<CommentDetail
					imgSrc={faker.image.image()}
					author={faker.name.firstName()}
					timeAgo='2 days ago'
					faves={faker.random.number()}
					text='This book is great!'
				/>
			</Card>
			<CommentDetail
				imgSrc={faker.image.image()}
				author={faker.name.firstName()}
				timeAgo='2 days ago'
				faves={faker.random.number()}
				text='This book is great!'
			/>
		</>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
