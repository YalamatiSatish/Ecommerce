/* eslint-disable no-unused-vars */

import { Box, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { InputAdornment, FormLabel } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormContainer from '../../components/FormContainer';
import { signInButtonStyle, profileFormOuter } from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAppDispatch } from '../../store';
import { getUserProfile, updateUser } from '../../store/user/thunk';
interface FormValues {
	name: string;
	email: string;
	password?: string;
	confirmPassword?: string;
}

interface FormErrors {
	name: boolean;
	email: boolean;
	password?: boolean;
	confirmPassword?: boolean;
}

const Profile = () => {
	const { loading, error, userloginDetails, userProfile } = useSelector(
		(state: RootState) => state.userLogin,
	);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const redirect = location.search ? location.search.split('=')[1] : '/';

	const [logInDetails, setLogInDetails] = useState<FormValues>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	useEffect(() => {
		if (userloginDetails === null) {
			navigate(redirect);
		} else {
			if (!userloginDetails || !userloginDetails.name) {
				dispatch(getUserProfile({ accessToken: userloginDetails.token }));
			} else {
				setLogInDetails({
					...logInDetails,
					name: userloginDetails.name,
					email: userloginDetails.email,
				});
			}
		}
	}, [userloginDetails, redirect, location]);

	const [logInFormErrors, setLogInFormErrors] = useState<FormErrors>({
		name: false,
		email: false,
		password: false,
		confirmPassword: false,
	});

	const [showPassword, setShowPassword] = useState({
		password: false,
		confirmPassword: false,
	});

	const handleShowPassword = (name: string, show: boolean) => {
		setShowPassword({ ...showPassword, [name]: show });
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setLogInDetails({
			...logInDetails,
			[name]: value,
		});
		setLogInFormErrors({
			...logInFormErrors,
			[name]: false,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const { name, email, password, confirmPassword } = logInDetails;
		console.log(name, email, password, confirmPassword, '2222');
		if (
			email.trim() === '' ||
			name.trim() === ''
			/* || password.trim() === '' ||
			confirmPassword.trim() === '' */
		) {
			setLogInFormErrors({
				email: email.trim() === '',
				name: name.trim() === '',
				/* password: password.trim() === '',
				confirmPassword: confirmPassword.trim() === '', */
			});
			return;
		} else if (password !== '' && password !== confirmPassword) {
			console.log(password, confirmPassword, '1111');
		} else if (userloginDetails !== null) {
			console.log('2222_updateProfile');
			const args = {
				body: {
					name: logInDetails.name,
					email: logInDetails.email,
					password: logInDetails.password ? logInDetails.password : '',
				},
				accessToken: userloginDetails.token,
			};
			dispatch(updateUser(args));
		}
	};
	return (
		<Box
			sx={{
				flexGrow: 1,
				padding: '0px 10px',
				//display: 'flex',
				//backgroundColor: { xs: 'red', md: 'green' },
			}}
		>
			<Grid
				container
				spacing={2} /* rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} */
			>
				<Grid item md={4} xs={12}>
					<Typography variant='h4'>User Profile</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						/* noValidate */ sx={profileFormOuter}
					>
						<FormControl margin='normal'>
							<FormLabel>Name </FormLabel>
							<TextField
								placeholder='First and last name'
								name='name'
								type='text'
								value={logInDetails.name}
								onChange={handleInputChange}
								error={logInFormErrors.name}
								helperText={logInFormErrors.name ? 'name is required' : ''}
							/>
						</FormControl>
						<FormControl margin='normal'>
							<FormLabel>Email Address </FormLabel>
							<TextField
								placeholder='Email Address'
								name='email'
								type='email'
								value={logInDetails.email}
								onChange={handleInputChange}
								error={logInFormErrors.email}
								helperText={logInFormErrors.email ? 'Username is required' : ''}
							/>
						</FormControl>
						<FormControl margin='normal'>
							<FormLabel>Password </FormLabel>
							<TextField
								placeholder='Password'
								type={showPassword.password ? 'text' : 'password'}
								name='password'
								value={logInDetails.password}
								onChange={handleInputChange}
								error={logInFormErrors.password}
								helperText={
									logInFormErrors.password
										? 'Password is required'
										: logInDetails.password &&
											  logInDetails.password.length > 0 &&
											  logInDetails.password.length < 8
											? 'password should be atleast of 8 characters'
											: ''
								}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											{!showPassword.password ? (
												<VisibilityIcon
													sx={{ cursor: 'pointer' }}
													onClick={() =>
														handleShowPassword('password', true)
													}
												/>
											) : (
												<VisibilityOff
													sx={{ cursor: 'pointer' }}
													onClick={() =>
														handleShowPassword('password', false)
													}
												/>
											)}
										</InputAdornment>
									),
								}}
								inputProps={{ minLength: 8 }}
							/>
						</FormControl>
						<FormControl margin='normal'>
							<FormLabel>Confirm password </FormLabel>
							<TextField
								placeholder='Password'
								type={showPassword.confirmPassword ? 'text' : 'password'}
								name='confirmPassword'
								value={logInDetails.confirmPassword}
								onChange={handleInputChange}
								error={logInFormErrors.confirmPassword}
								helperText={
									logInFormErrors.confirmPassword
										? 'Confirm Password must match with password'
										: logInDetails.confirmPassword &&
											  logInDetails.confirmPassword.length > 0 &&
											  logInDetails.confirmPassword.length < 8
											? 'confirm password should be of a minimum length of 8 characters'
											: ''
								}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											{!showPassword.confirmPassword ? (
												<VisibilityIcon
													sx={{ cursor: 'pointer' }}
													onClick={() =>
														handleShowPassword('confirmPassword', true)
													}
												/>
											) : (
												<VisibilityOff
													sx={{ cursor: 'pointer' }}
													onClick={() =>
														handleShowPassword('confirmPassword', false)
													}
												/>
											)}
										</InputAdornment>
									),
								}}
								inputProps={{ minLength: 8 }}
							/>
						</FormControl>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							sx={signInButtonStyle}
						>
							Update
						</Button>
					</Box>
				</Grid>
				<Grid item md={8} xs={0}>
					<Typography variant='h4'>My Orders</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Profile;
