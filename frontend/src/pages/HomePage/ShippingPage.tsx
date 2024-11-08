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
import { useLocation, useNavigate,  } from 'react-router-dom';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import { registerUser } from '../../store/user/thunk';
import { handleShippingAddressItems } from '../../store/cart/slice';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAppDispatch } from '../../store';
import CheckOut from '../../components/CheckOut';

interface FormValues {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

interface FormErrors {
	address: boolean;
	city: boolean;
	postalCode: boolean;
	country: boolean;
}

const ShippingPage = () => {
	const { loading, error, shippingAddress } = useSelector((state: RootState) => state.cart);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const [shippingFormDetails, setShippingFormDetails] = useState<FormValues>({
		address: shippingAddress.address,
		city: shippingAddress.city,
		postalCode: shippingAddress.postalCode,
		country: shippingAddress.country,
	});
	const [logInFormErrors, setLogInFormErrors] = useState<FormErrors>({
		address: false,
		city: false,
		postalCode: false,
		country: false,
	});

	/* 	const [showPassword, setShowPassword] = useState({
		password: false,
		confirmPassword: false,
	});

	const handleShowPassword = (name: string, show: boolean) => {
		setShowPassword({ ...showPassword, [name]: show });
	}; */

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setShippingFormDetails({
			...shippingFormDetails,
			[name]: value,
		});
		setLogInFormErrors({
			...logInFormErrors,
			[name]: false,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		console.log('submitted');
		const { address, city, postalCode, country } = shippingFormDetails;
		console.log(address, city, postalCode, country, '11111');

		dispatch(handleShippingAddressItems(shippingFormDetails));
		navigate('/payment');
		/* if (
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
			dispatch(registerUser(shippingFormDetails));
		} */
		// Handle successful form submission logic here
		//dispatch(fetchUserLogInDetails(shippingFormDetails));
	};
	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
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
						sx={logInFormOuter}
					>
						<CheckOut step={1} />
						<h3> SHIPPING </h3>

						<FormControl margin='normal'>
							<FormLabel>Address *</FormLabel>
							<TextField
								placeholder='Enter your Address'
								name='address'
								type='text'
								value={shippingFormDetails.address}
								onChange={handleInputChange}
								required
								error={logInFormErrors.address}
								helperText={logInFormErrors.address ? 'name is required' : ''}
							/>
						</FormControl>
						<FormControl margin='normal'>
							<FormLabel>City *</FormLabel>
							<TextField
								placeholder='City'
								name='city'
								type='text'
								value={shippingFormDetails.city}
								onChange={handleInputChange}
								required
								error={logInFormErrors.city}
								helperText={logInFormErrors.city ? 'Username is required' : ''}
							/>
						</FormControl>
						<FormControl margin='normal'>
							<FormLabel> Postal Code *</FormLabel>
							<TextField
								placeholder='Postal Code '
								type={'text'}
								name='postalCode'
								value={shippingFormDetails.postalCode}
								onChange={handleInputChange}
								required
								error={logInFormErrors.postalCode}
								//inputProps={{ minLength: 8 }}
							/>
						</FormControl>
						<FormControl margin='normal'>
							<FormLabel>Country * </FormLabel>
							<TextField
								placeholder='Country'
								type='text'
								name='country'
								value={shippingFormDetails.country}
								onChange={handleInputChange}
								required
								error={logInFormErrors.country}
							/>
						</FormControl>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							sx={signInButtonStyle}
						>
							Continue
						</Button>
					</Box>
				</FormContainer>
			)}
		</Box>
	);
};

export default ShippingPage;
