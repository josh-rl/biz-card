import React, { useState, useEffect } from "react";
 
export default function Edit({toUserList}) {
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		email: "",
	});

	useEffect(() => {
		// TODO
	}, []);
 
	function updateForm(value) {
		return setForm((prev) => {
			return { ...prev, ...value };
		});
	}

	async function onSubmit(e) {
		e.preventDefault();
		// const editedUser = {
		// 	first_name: form.first_name,
		// 	last_name: form.last_name,
		// 	email: form.email,
		// };
		// TODO
	}
 
	return (
		<div>
			<h3>Update Record</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="firstname">First Name: </label>
					<input
						type="text"
						className="form-control"
						id="firstname"
						value={form.first_name}
						onChange={(e) => updateForm({ first_name: e.target.value })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="lastname">Last Name: </label>
					<input
						type="text"
						className="form-control"
						id="lastname"
						value={form.last_name}
						onChange={(e) => updateForm({ last_name: e.target.value })}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email: </label>
					<input
						type="text"
						className="form-control"
						id="email"
						value={form.email}
						onChange={(e) => updateForm({ email: e.target.value })}
					/>
				</div>
				{/* <div className="form-group">
					<label htmlFor="password">Password: </label>
					<input
						type="text"
						className="form-control"
						id="password"
						value={form.pass}
						onChange={(e) => updateForm({ pass: e.target.value })}
					/>
				</div> */}
				<br />
				<div className="form-group">
					<input
						type="submit"
						value="Update Record"
						className="btn btn-primary"
					/>
				</div>
			</form>
		</div>
	);
}
