import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard';

const App = () => {
	return (
		<div className="ui container comments">
			<ApprovalCard />
			<CommentDetail author="Sam" timeAgo="Today at 4pm" comment="Great post!" src={faker.image.avatar()} />
			<CommentDetail
				author="Jane"
				timeAgo="Yesterday at 4pm"
				comment="Fantastic post!"
				src={faker.image.avatar()}
			/>
			<CommentDetail
				author="Cobra"
				timeAgo="Yesterday at 11am"
				comment="Mediocre post!"
				src={faker.image.avatar()}
			/>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
