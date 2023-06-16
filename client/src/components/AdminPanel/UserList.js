import React, { useEffect, useState } from "react";
 
const User = (props) => (
	<tr>
		<td>{props.user.first_name}</td>
		<td>{props.user.last_name}</td>
		<td>{props.user.email}</td>
		<td>
			<button 
				className="btn btn-link" 
				onClick={() => {
					// TODO
				}}
			>
				Edit
			</button>
				|
			<button 
				className="btn btn-link"
				onClick={() => {
					// TODO
				}}
			>
				Delete
			</button>
		</td>
	</tr>
);
 
const UserList = ({setEditUID, setDeleUID}) => {
	// const [users, setUsers] = useState([]);
	const [users] = useState([]);

	useEffect(() => {
		// TODO
	}, [users.length]);

	function renderList() {
		return users.map((user) => {
			return (
				<User
					user={user}
					editUser={() => {
						// TODO
					}}
					deleUser={() => {
						// TODO
					}}
				/>
			);
		});
	}

	return (
		<div>
			<h3>User List</h3>
			<table className="table table-striped" style={{ marginTop: 20 }}>
				<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
				</tr>
				</thead>
				<tbody>{renderList()}</tbody>
			</table>
		</div>
	);
}

export default UserList;
