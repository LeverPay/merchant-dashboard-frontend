import React from "react";
import "./general.css";
import Logo from "./Header-components/Logo";
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SyncAltRoundedIcon from '@mui/icons-material/SyncAltRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';

export default function SidebarNav(props) {
	const sidebarItemsTop = [
		{icon: <DashboardRoundedIcon htmlColor="white"/>, link: './', title: 'Dashboard'},
		// {icon: <SyncAltRoundedIcon htmlColor="white"/>, link: 'payment_method', title: 'Overview'},
		{icon: <SyncAltRoundedIcon htmlColor="white"/>, link: 'transactions', title: 'Transaction'},
		{icon: <CreditCardRoundedIcon htmlColor="white"/>, link: 'payment_method', title: 'Payment Method'},
		{icon: <BusinessCenterRoundedIcon htmlColor="white"/>, link: 'portfolio', title: 'Portfolio'},
		{icon: <AccountCircleTwoToneIcon htmlColor="white"/>, link: 'profile', title: 'Profile'},
		{icon: <SettingsRoundedIcon htmlColor="white"/>, link: 'security', title: 'Setting'},
	];
	
	const sidebarItemsBottom = [
		{iconStart: <FileCopyOutlinedIcon htmlColor="white"/>, link: './', title: 'Documentation', iconEnd: <OpenInNewOutlinedIcon htmlColor="white"/>},
		{iconStart: <QuizOutlinedIcon htmlColor="white"/>, link: './', title: 'Help & Support', iconEnd: <OpenInNewOutlinedIcon htmlColor="white"/>}
	]
	
	return (
		<aside className="sidebar-nav text-white">
			<section className="border-bottom" style={{height: props.fixedTopHeight}}>
				<div className="d-flex align-items-center bg-light px-3" style={{height: '50%'}}><Logo/></div>
			</section>
			<section className="d-flex flex-column justify-content-between contents" style={{height: `calc(100% - ${(props.fixedTopHeight)}px)`}}>
				<div className="d-flex flex-column sidebar-links-top">
					{sidebarItemsTop.map((item, idx) => {
						return (
							<a key={idx} href={item.link} className="d-flex align-items-center link-light">
								<span className="link-icon">{item.icon}</span>
								<span>{item.title}</span>
							</a>
						);
					})}
				</div>
				<div className="d-flex flex-column sidebar-links-bottom">
					{sidebarItemsBottom.map((item, idx) => {
						return (
							<a key={idx} href={item.link} className="d-flex align-items-center link-light">
								<span className="link-icon">{item.iconStart}</span>
								<div className="d-flex flex-fill justify-content-between align-items-center">
									<span>{item.title}</span>
									<span className="link-icon">{item.iconEnd}</span>
								</div>
							</a>
						);
					})}
				</div>
			</section>
		</aside>
	);
}
