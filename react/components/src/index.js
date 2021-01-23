import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';
import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard';

const App = () => {
	const firstAuthor = 'Alex';
	return (
		<div class='ui comments'>
			<ApprovalCard>
				<div>
					<h4>Warning!</h4>
					<p>Are you sure you want to do this?</p>
				</div>
			</ApprovalCard>
			<ApprovalCard>
				<CommentDetail
					author={firstAuthor}
					timeAgo='2 days ago'
					faves='3 Faves'
					text='hey guys, this is first'
					imgSrc={faker.image.image()}
				/>
			</ApprovalCard>
			<ApprovalCard>
				<CommentDetail
					author='John'
					timeAgo='3 days ago'
					faves='10 Faves'
					text='hey guys, this is second'
					imgSrc={faker.image.image()}
				/>
			</ApprovalCard>
			<ApprovalCard>
				<CommentDetail
					author='Peter'
					timeAgo='5 days ago'
					faves='2 Faves'
					text='hey guys, this is third'
					imgSrc={faker.image.image()}
				/>
			</ApprovalCard>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
