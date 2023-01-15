const UserList = ({ users }) => {
	const tableContent = users.map((user) => {
		return (
			<tr>
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
			<tbody>{tableContent}</tbody>
		</table>
	);
};

export default UserList;
