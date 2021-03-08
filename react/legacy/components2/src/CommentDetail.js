import React from 'react';

const CommentDetail = (props) => {
	return (
		<div class='comment'>
			<img src={props.imgSrc} />
			<div class='content'>
				<a class='author'>{props.author}</a>
			</div>
		</div>
	);
};

export default CommentDetail;
