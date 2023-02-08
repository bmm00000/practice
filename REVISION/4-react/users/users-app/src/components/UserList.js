import User from './User';

const UserList = ({ users }) => {
	return (
		<>
			<ul>
				{users.map((user) => (
					<User key={user.id} name={user.name} age={user.age} />
				))}
			</ul>
		</>
	);
};

export default UserList;
