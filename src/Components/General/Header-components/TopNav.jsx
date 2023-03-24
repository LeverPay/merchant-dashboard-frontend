import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function TopNav() {
	return (
		<div className="d-flex justify-content-end align-items-center">
			<a href="" className="me-3"><NotificationsIcon className="header-notification-icon" htmlColor={"grey"}/></a>
			<a href="">
				<img className="img-fluid rounded-circle" src={require("../../../Assets/Ellipse 2.png")} alt="Profile-Image" style={{width: '32px'}}/>
				<KeyboardArrowDownIcon htmlColor="black"/>
			</a>
		</div>
	);
}
