import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
//import MoreIcon from '@mui/icons-material/MoreVert';

import { Link } from 'react-router-dom';
import { HeaderOuterStyle } from './style';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';



import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { handleLogOutUser } from '../store/user/slice';
import { useAppDispatch } from '../store';


const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));



const HeaderResponsive = () => {
	const { userloginDetails } = useSelector((state: RootState) => state.userLogin);
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	React.useEffect(() => {
		if (userloginDetails === null) {
			setAnchorEl(null);
			handleMobileMenuClose();
		}
	}, [userloginDetails]);

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};
	const handleLogout = () => {
		localStorage.removeItem('userInfo');
		dispatch(handleLogOutUser());
	};

	// Desktop Logout functionality
	const [anchorElDesktop, setAnchorElDesktop] = React.useState<null | HTMLElement>(null);
	const handleClickDesktop = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElDesktop(event.currentTarget);
	};

	const handleCloseDesktop = () => {
		setAnchorElDesktop(null);
	};

	const handleLogoutDesktop = () => {
		// Handle logout logic here
		handleCloseDesktop();
		localStorage.removeItem('userInfo');
		dispatch(handleLogOutUser());
	};

	const handleProfileDesktop = () => {
		// Handle profile navigation here
		console.log('Navigate to profile');
		handleCloseDesktop();
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
			sx={{ marginTop: 4 }}
		>
			<MenuItem onClick={handleMenuClose}>
				<Link to='/profile' style={{ textDecoration: 'none', color: 'black' }}>
					Profile
				</Link>{' '}
			</MenuItem>
			<MenuItem onClick={handleLogout}>Log out</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<ShoppingCartIcon />
					<Typography>
						<Link to='/cart' style={{ textDecoration: 'none', color: 'black' }}>
							CART
						</Link>
					</Typography>
				</Box>
			</MenuItem>
			<MenuItem>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					{userloginDetails === null ? (
						<Typography sx={{ display: 'flex', alignItems: 'center' }}>
							<PersonIcon />
							<Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
								LOGIN
							</Link>
						</Typography>
					) : (
						<Typography
							sx={{ display: 'flex', alignItems: 'center' }}
							onClick={handleProfileMenuOpen}
						>
							<AccountCircle />

							<Typography /* to='/profile' */ style={{ color: 'black' }}>
								{userloginDetails.name}
							</Typography>
						</Typography>
					)}
				</Box>
			</MenuItem>
		</Menu>
	);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='sticky' sx={HeaderOuterStyle}>
				<Toolbar>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ display: { /* xs: 'none', */ sm: 'block' }, backgroundColor: '' }}
					>
						<Link
							to='/'
							style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}
						>
							{' '}
							PROSHOP{' '}
						</Link>{' '}
					</Typography>

					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '16px' }}>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<ShoppingCartIcon />
							<Typography>
								<Link to='/cart' style={{ textDecoration: 'none', color: 'white' }}>
									CART
								</Link>
							</Typography>
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<PersonIcon />
							{userloginDetails !== null ? (
								<Typography onClick={handleClickDesktop}>
									<Menu
										anchorEl={anchorElDesktop}
										open={Boolean(anchorElDesktop)}
										onClose={handleCloseDesktop}
										sx={{ marginTop: 1 }}
									>
										<MenuItem onClick={handleProfileDesktop}>
											<Link
												to='/profile'
												style={{
													textDecoration: 'none',
													color: 'black',
												}}
											>
												Profile
											</Link>{' '}
										</MenuItem>
										<MenuItem onClick={handleLogoutDesktop}>Logout</MenuItem>
									</Menu>
									<Link
										to='/login'
										style={{ textDecoration: 'none', color: 'white' }}
									>
										<Typography onClick={handleCloseDesktop}>
											{' '}
											{userloginDetails.name}{' '}
										</Typography>
									</Link>
								</Typography>
							) : (
								<Typography>
									<Link
										to='/login'
										style={{ textDecoration: 'none', color: 'white' }}
									>
										LOGIN
									</Link>
								</Typography>
							)}
						</Box>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' }, backgroundColor: '' }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'
						>
							{/* <MoreIcon /> */}
							<MenuIcon />
						</IconButton>
					</Box>
					<Search sx={{ display: { xs: 'none', sm: 'block' }, backgroundColor: '' }}>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search…'
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
};

export default HeaderResponsive;
