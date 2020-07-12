import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard';

const App = () => {
	return (
		<div className="ui container comments">
			<ApprovalCard>
				<div>
					<h2>Warning!</h2>
					Are you sure you want to do this?
				</div>
			</ApprovalCard>
			<ApprovalCard>
				<CommentDetail author="Sam" timeAgo="Today at 4pm" comment="Great post!" src={faker.image.avatar()} />
			</ApprovalCard>
			<ApprovalCard>
				<CommentDetail
					author="Jane"
					timeAgo="Yesterday at 4pm"
					comment="Fantastic post!"
					src={faker.image.avatar()}
				/>
			</ApprovalCard>
			<ApprovalCard>
				<CommentDetail
					author="Cobra"
					timeAgo="Yesterday at 11am"
					comment="Mediocre post!"
					src={faker.image.avatar()}
				/>
			</ApprovalCard>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
