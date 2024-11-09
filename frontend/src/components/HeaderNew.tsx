/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';

import StoreIcon from '@mui/icons-material/Store';
//import MailIcon from '@mui/icons-material/Mail';
//import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	InputBase,
	Badge,
	Avatar,
	Menu,
	MenuItem,
	Switch,
	useTheme,
} from '@mui/material';

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { handleLogOutUser, handleModeChange } from '../store/user/slice';
import { useAppDispatch } from '../store';
import { Link } from 'react-router-dom';
//import { handleChangeMode } from '../store/products/slice';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import CustomToolTip from './ToolTip';
import { HeaderOuterStyle, searchHeader } from './style';

/* const StyledToolbar = styled(Toolbar)({
	display: 'flex',
	justifyContent: 'space-between',
	backgroundColor: 'red',
	//backgroundColor: '#242323',
}); */

/* const Search = styled('div')(({ theme }) => ({
	backgroundColor: 'white',
	padding: '0px 10px',
	borderRadius: theme.shape.borderRadius,
	width: '40%',

})); */

const Icons = styled(Box)(({ theme }) => ({
	display: 'none',
	alignItems: 'center',
	gap: '20px',
	//backgroundColor: 'white' /* alpha(theme.palette.common.white, 0.15) */,
	padding: '0px 10px',
	borderRadius: theme.shape.borderRadius,
	[theme.breakpoints.up('sm')]: {
		display: 'flex',
	},
}));

const UserBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: '10px',
	//backgroundColor: 'white' /* alpha(theme.palette.common.white, 0.15) */,
	padding: '0px 10px',
	borderRadius: theme.shape.borderRadius,
	[theme.breakpoints.up('sm')]: {
		display: 'none',
	},
}));

const ToggleSwitch = styled(Switch)(({ theme }) => ({
	'& .MuiSwitch-switchBase.Mui-checked': {
		color: 'white',
		/* '&:hover': {
			backgroundColor: 'yellow',
		}, */
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: 'white',
	},
}));

const HeaderNew = () => {
	const { userloginDetails } = useSelector((state: RootState) => state.userLogin);
	const dispatch = useAppDispatch();

	const [openMenuProfile, setOpenMenuProfile] = useState<boolean>(false);
	// Toggle function to switch between light and dark mode
	/* const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	}; */
	const [checked, setChecked] = React.useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
		dispatch(handleModeChange());
	};


	return (
		<AppBar position='sticky'>
			<Box sx={HeaderOuterStyle}>
				<Typography
					variant='h5'
					sx={{ display: { xs: 'none', sm: 'block' } /* backgroundColor: ''  */ }}
				>
					{' '}
					<Link to='/' style={{ textDecoration: 'none' /* color: 'white'  */ }}>
						PROSHOP
					</Link>
				</Typography>
				<Link to='/' style={{ textDecoration: 'none' /*  color: 'white' */ }}>
					<StoreIcon
						sx={{ display: { xs: 'block', sm: 'none' } /* backgroundColor: ''  */ }}
					/>
				</Link>
				<Box sx={searchHeader} >
					<InputBase placeholder='Search ...' />{' '}
				</Box>
				<Icons>
					{/* <Badge badgeContent={4} color='error'>
						<MailIcon />
					</Badge>
					<Badge badgeContent={17} color='error'>
						<NotificationsIcon />
					</Badge> */}
					<Badge badgeContent={0} color='error'>
						<Link to='/cart' style={{ textDecoration: 'none' /* color: 'white' */ }}>
							<ShoppingCartIcon />
						</Link>
					</Badge>
					{userloginDetails !== null ? (
						<Avatar
							alt='Satish Sharp'
							src='../../public/Images/playstation.jpg'
							sx={{ width: '30px', height: '30px' }}
							onClick={() => setOpenMenuProfile(true)}
						/>
					) : (
						<Link to='/login' style={{ textDecoration: 'none' /* color: 'white' */ }}>
							<PersonIcon />
						</Link>
					)}
				</Icons>
				{userloginDetails !== null ? (
					<UserBox onClick={() => setOpenMenuProfile(true)}>
						<Avatar
							alt='Satish Sharp'
							src='../../public/Images/playstation.jpg'
							sx={{ width: '30px', height: '30px' }}
						/>
						<Typography>Satish</Typography>
					</UserBox>
				) : (
					<UserBox onClick={() => setOpenMenuProfile(true)}>
						<Avatar
							alt='Satish Sharp'
							src='../../public/Images/playstation.jpg'
							sx={{ width: '30px', height: '30px' }}
						/>
						<Typography>Satish</Typography>
					</UserBox>
				)}
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<ToggleSwitch
						color='default'
						//sx={{ color: 'white' }}
						checked={checked}
						onChange={handleChange}
					></ToggleSwitch>
					{
						/* theme.palette.mode === 'dark' */ !checked ? (
							<CustomToolTip title={'Light Mode'} /* 	 */>
								<LightModeOutlinedIcon />
							</CustomToolTip>
						) : (
							<CustomToolTip title={'Dark mode'}>
								<Brightness4Icon />
							</CustomToolTip>
						)
					}{' '}
				</Box>
				{/* <Switch
						color='default'
						sx={{ color: 'white' }}
						checked={checked}
						onChange={handleChange}
					/> */}
			</Box>

			{userloginDetails !== null ? (
				<Menu
					id='demo-positioned-menu'
					aria-labelledby='demo-positioned-button'
					open={openMenuProfile}
					onClick={() => setOpenMenuProfile(false)}
					onClose={() => setOpenMenuProfile(false)}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					sx={{ marginTop: '20px' }}
				>
					<MenuItem>Profile</MenuItem>
					<MenuItem>My Cart</MenuItem>
					<MenuItem>Logout</MenuItem>
				</Menu>
			) : (
				<Menu
					id='demo-positioned-menu'
					aria-labelledby='demo-positioned-button'
					open={openMenuProfile}
					onClick={() => setOpenMenuProfile(false)}
					onClose={() => setOpenMenuProfile(false)}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					sx={{ marginTop: '30px' }}
				>
					<MenuItem>Log In</MenuItem>
				</Menu>
			)}
		</AppBar>
	);
};

export default HeaderNew;
