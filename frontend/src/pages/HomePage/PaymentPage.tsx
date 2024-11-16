/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import CheckOut from '../../components/CheckOut';
import { Box, Button, Checkbox } from '@mui/material';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';

import FormContainer from '../../components/FormContainer';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { signInButtonStyle } from './style';
import { logInFormOuter } from './style';
import { useNavigate } from 'react-router-dom';
import { handleSavePaymentMethod } from '../../store/cart/slice';

const PaymentPage = () => {
	const { loading, error } = useSelector((state: RootState) => state.cart);
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const [checkPayment, setCheckPayment] = useState('paypal');
	console.log(checkPayment, 'checkPayment');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCheckPayment((event.target as HTMLInputElement).value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		console.log('submitted', checkPayment);
		//const { address, city, postalCode, country } = shippingFormDetails;

		dispatch(handleSavePaymentMethod(checkPayment));
		navigate('/placeorder');
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
						sx={logInFormOuter}
						//sx={{ display: 'flex', flexDirection: 'column' }}
					>
						<CheckOut step={2} />

						<FormControl sx={{ padding: '10px' }}>
							<FormLabel id='demo-controlled-radio-buttons-group'>
								Select Method
							</FormLabel>
							<RadioGroup
								aria-labelledby='demo-controlled-radio-buttons-group'
								name='controlled-radio-buttons-group'
								value={checkPayment}
								onChange={handleChange}
							>
								<FormControlLabel
									value='paypal'
									control={<Radio checked/* ={checkPayment === 'paypal'} */ />}
									label='Paypal or Credit Card'
								/>
							</RadioGroup>
						</FormControl>

						<FormControl margin='normal'>
							<FormLabel id='demo-radio-buttons-group-label'>Select Method</FormLabel>
							{/* 							<FormControlLabel
								value='paypal'
								control={<Radio checked onChange={handleChange} value='paypal' />}
								label='Paypal or Credit Card'
							/> */}

							{/* <RadioGroup
								aria-labelledby='demo-radio-buttons-group-label'
								defaultValue='female'
								name='radio-buttons-group'
								value={checkPayment}
								onChange={handleChange}
							>
								<FormControlLabel
									value='paypalorcreditcard'
									control={<Radio />}
									label='Paypal or Credit Card'
								/>
							</RadioGroup> */}
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

export default PaymentPage;
