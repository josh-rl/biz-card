import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import UserList from "./UserList";
import Edit from "./Edit";
import Create from "./Create";

const AdminPanel = () => {
	return(
		<div className="app-container-base">
		<Tabs defaultActiveKey="info" className="mb-3">
			<Tab eventKey="info" title="Info">
				<h3>
					Welcome!
				</h3>
				<p>
					This is a test page.
				</p>
			</Tab>
			<Tab eventKey="userlist" title="User List">
				<UserList/>
			</Tab>
			<Tab eventKey="create" title="Create">
				<Create/>
			</Tab>
			<Tab eventKey="edit" title="Edit">
				<Edit/>
			</Tab>
		</Tabs>
		</div>
	);
};

export default AdminPanel;
