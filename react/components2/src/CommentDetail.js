import React from 'react';

const CommentDetail = (props) => {
	return (
		<div className='ui comments'>
			<div class='comment'>
				<a class='avatar'>
					<img src={props.imgSrc} />
				</a>
				<div class='content'>
					<a class='author'>{props.author}</a>
					<div class='metadata'>
						<div class='date'>{props.timeAgo}</div>
						<div class='rating'>
							<i class='star icon'></i>
							{props.faves}
						</div>
					</div>
					<div class='text'>{props.text}</div>
				</div>
			</div>
		</div>
	);
};

export default CommentDetail;
