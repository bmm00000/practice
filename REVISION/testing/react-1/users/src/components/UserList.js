const UserList = ({ users }) => {
	const tableContent = users.map((user) => {
		return (
			<tr key={user.name}>
				<td>{user.name}</td>
				<td>{user.email}</td>
			</tr>
		);
	});

	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
				</tr>
			</thead>
			<tbody data-testid='users'>{tableContent}</tbody>
		</table>
	);
};

export default UserList;
