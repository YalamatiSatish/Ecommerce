import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { Box, InputAdornment, FormLabel } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormContainer from '../../components/FormContainer';
import { signInButtonStyle, logInFormOuter } from './style';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAppDispatch } from '../../store';
import { fetchUserLogInDetails } from '../../store/user/thunk';

interface FormValues {
	username: string;
	password: string;
}

interface FormErrors {
	username: boolean;
	password: boolean;
}

const LoginScreen = () => {
	const { userloginDetails, loading, error } = useSelector((state: RootState) => state.userLogin);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userloginDetails ) {
			navigate(redirect);
		}
	}, [userloginDetails, redirect, location]);

	const [logInDetails, setLogInDetails] = useState<FormValues>({
		username: '',
		password: '',
	});

	const [logInFormErrors, setLogInFormErrors] = useState<FormErrors>({
		username: false,
		password: false,
	});

	const [showPassword, setShowPassword] = useState(false);

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev);
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
		const { username, password } = logInDetails;

		if (username.trim() === '' || password.trim() === '') {
			setLogInFormErrors({
				username: username.trim() === '',
				password: password.trim() === '',
			});
			return;
		}
		// Handle successful form submission logic here
		dispatch(fetchUserLogInDetails(logInDetails));
	};
	return (
		<Box>
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
						SIGN IN
						<FormControl margin='normal'>
							<FormLabel>User name *</FormLabel>
							<TextField
								placeholder='Username'
								name='username'
								type='text'
								value={logInDetails.username}
								onChange={handleInputChange}
								required
								error={logInFormErrors.username}
								helperText={logInFormErrors.username ? 'Username is required' : ''}
							/>
						</FormControl>
						<FormControl margin='normal'>
							<FormLabel>Password *</FormLabel>
							<TextField
								placeholder='Password'
								type={showPassword ? 'text' : 'password'}
								name='password'
								value={logInDetails.password}
								onChange={handleInputChange}
								required
								error={logInFormErrors.password}
								helperText={logInFormErrors.password ? 'Password is required' : ''}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											{!showPassword ? (
												<VisibilityIcon
													sx={{ cursor: 'pointer' }}
													onClick={handleShowPassword}
												/>
											) : (
												<VisibilityOff
													sx={{ cursor: 'pointer' }}
													onClick={handleShowPassword}
												/>
											)}
										</InputAdornment>
									),
								}}
							/>
						</FormControl>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							sx={signInButtonStyle}
						>
							Sign In
						</Button>
						<Box sx={{ marginTop:'20px' }} >
							New Customer?{'   '}
							<Link to={redirect ? `/register?redirect=${redirect}` : '/register'} style={{ marginLeft:'6px', color: 'black' }} >
								Register
							</Link>
						</Box>
					</Box>
				</FormContainer>
			)}
		</Box>
	);
};

export default LoginScreen;
