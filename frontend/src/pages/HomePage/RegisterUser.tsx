/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { Box, InputAdornment, FormLabel } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormContainer from '../../components/FormContainer';
import { signInButtonStyle, logInFormOuter } from './style';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAppDispatch } from '../../store';
import { registerUser } from '../../store/user/thunk';

interface FormValues {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface FormErrors {
	name: boolean;
	email: boolean;
	password: boolean;
	confirmPassword: boolean;
}

const RegisterUser = () => {
	const { loading, error, userRegister } = useSelector((state: RootState) => state.userLogin);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userRegister) {
			navigate(redirect);
		}
	}, [userRegister, redirect, location]);

	const [logInDetails, setLogInDetails] = useState<FormValues>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
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
		if (
			email.trim() === '' ||
			password.trim() === '' ||
			name.trim() === '' ||
			confirmPassword.trim() === ''
		) {
			setLogInFormErrors({
				email: email.trim() === '',
				password: password.trim() === '',
				name: name.trim() === '',
				confirmPassword: confirmPassword.trim() === '',
			});
			return;
		} else if (password !== confirmPassword) {
			setLogInFormErrors({
				...logInFormErrors,
				password: true,
			});
		} else {
			dispatch(registerUser(logInDetails));
		}
		// Handle successful form submission logic here
		//dispatch(fetchUserLogInDetails(logInDetails));
	};
	return (
		<Box
			/* sx={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}} */
		>
			{loading === 'loading' ? (
				<Loader />
			) : loading === 'failed' ? (
				<ErrorMessage> {error?.error_detail} </ErrorMessage>
			) : (
				<FormContainer>
					<Box
						component='form'
						onSubmit={handleSubmit}
						/* noValidate */ sx={logInFormOuter}
					>
						Create a new account
						<FormControl margin='normal'>
							<FormLabel>Name *</FormLabel>
							<TextField
								placeholder='First and last name'
								name='name'
								type='text'
								value={logInDetails.name}
								onChange={handleInputChange}
								required
								error={logInFormErrors.name}
								helperText={logInFormErrors.name ? 'name is required' : ''}
							/>
						</FormControl>
						<FormControl margin='normal'>
							<FormLabel>Email Address *</FormLabel>
							<TextField
								placeholder='Email Address'
								name='email'
								type='email'
								value={logInDetails.email}
								onChange={handleInputChange}
								required
								error={logInFormErrors.email}
								helperText={logInFormErrors.email ? 'Username is required' : ''}
							/>
						</FormControl>
						<FormControl margin='normal'>
							<FormLabel>Password *</FormLabel>
							<TextField
								placeholder='Password'
								type={showPassword.password ? 'text' : 'password'}
								name='password'
								value={logInDetails.password}
								onChange={handleInputChange}
								required
								error={logInFormErrors.password}
								helperText={
									logInFormErrors.password
										? 'Password is required'
										: logInDetails.password.length > 0 &&
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
							<FormLabel>Confirm password *</FormLabel>
							<TextField
								placeholder='Password'
								type={showPassword.confirmPassword ? 'text' : 'password'}
								name='confirmPassword'
								value={logInDetails.confirmPassword}
								onChange={handleInputChange}
								required
								error={logInFormErrors.confirmPassword}
								helperText={
									logInFormErrors.confirmPassword
										? 'Confirm Password must match with password'
										: logInDetails.confirmPassword.length > 0 &&
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
							Register
						</Button>
					</Box>
				</FormContainer>
			)}
		</Box>
	);
};

export default RegisterUser;
