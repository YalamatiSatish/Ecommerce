export const productDetailMain = () => ({
	padding: '20px 0px 0px 150px',
	'@media (max-width:1024px)': {
		padding: '6px',
	},
});
export const productDetailContainer = () => ({
	display: 'flex',
	gap: '16px',
	marginTop: '20px',
	'@media (max-width:1024px)': {
		//backgroundColor: 'red',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		marginTop: '0px',
	},
});
export const productDetailCart = () => ({
	border: '1px solid lightgray',
	width: '18%',
	//
	display: 'flex',
	flexDirection: 'column',
	'@media (max-width:1024px)': {
		width: '100%',
		padding: '10px 0px',
		boxShadow: '0px 0px 4px 0px gray',
	},
});

export const productDetailTitleDescription = () => ({
	display: 'flex',
	flexDirection: 'column',
	width: '25%',
	padding: '10px',
	backgroundColor: 'white',
	'@media (max-width:1024px)': {
		width: 'calc(100% -  12px)',
		padding: '6px',
		boxShadow: '0px 0px 4px 0px gray',
	},
});

export const productDetailImg = () => ({
	height: '100%',
	width: '50%',
	boxShadow: '0px 0px 4px 0px gray',
	'@media (max-width:1024px)': {
		width: 'calc(100% -  12px)',
		height: '10%',
		padding: '6px',
	},
});

//Cart
export const cartGridOuter = () => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	borderBottom: '1px solid gray',
	'@media (max-width:767px)': {
		flexDirection: 'column',
	},
});

export const cartPageMain = () => ({
	marginLeft: '40px',
	display: 'flex',
	gap: '10px',
	'@media (max-width:1024px)': {
		marginLeft: '0px',

		display: 'flex',
		flexDirection: 'column',
		gap: '0px',
	},
});

/* export const cartPageItems = () => ({
	width: '100%',
	padding: '20px',
	gap: '60px',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',

	'@media (max-width:1024px)': {
		marginLeft: '0px',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		gap: '6px',
		backgroundColor: 'red',
	},
}); */

export const cartPageItems = () => ({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: 2,
	py: 2,
	flexWrap: 'wrap',
	borderBottom: '1px solid #ddd',
	'@media (max-width:1024px)': {
		width: 'calc(100% - 12px)',
		gap: 2,
		padding: '6px',
	},
});

export const cartImage = () => ({
	width: '125px',
	height: '125px',
	'@media (max-width:1024px)': {
		width: '100%',
		height: '40%',
	},
});

export const cartItemDesc = () => ({
	width: '10%',
	flexWrap: 'wrap',
	'@media (max-width:1024px)': {
		width: '100%',
		fontWeight: 'bold',
	},
});

export const cartItemPrice = () => ({
	width: '10%',
	'@media (max-width:1024px)': {
		width: '100%',
		fontWeight: 'bold',
	},
});

export const cartItemSelect = () => ({
	display: 'flex',
	justifyContent: 'flex-start',
	width: '160px',
	'@media (max-width:1024px)': {
		width: '100%',
		/* display: 'flex',
		alignItems: 'flex-start',
		backgroundColor: 'red', */
	},
});

export const cartPageCheckOut = () => ({
	width: '40%',
	border: '1px solid gray',
	backgroundColor: 'white',
	height: '20%',
	margin: '20px',
	'@media (max-width:1024px)': {
		display: 'flex',
		flexDirection: 'column',
		margin: '0px',
		width: '100%',
	},
});

// LogInScreen
export const logInFormOuter = () => ({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	paddingLeft: '140px',
	marginTop: '20px',
	'@media (max-width:1024px)': {
		paddingLeft: '10px',
	},
});
export const signInButtonStyle = () => ({
	width: '150px',
	backgroundColor: 'black',
	marginTop: '10px',
	height: '50px',
	fontWeight: 'bold',
	fontSize: '16px',
	lineHeight: '40px',
	/* '@media (max-width:1024px)': {
		width:'300px',

	}, */
});

// profileScreen
export const profileFormOuter = () => ({
	display: 'flex',
	flexDirection: 'column',
	width: '350px',
	/* '@media (max-width:1024px)': {
		paddingLeft: '10px',
	}, */
});

// placeOrder Screen
export const placeOrderMain = () => ({
	paddingLeft: '10%',
	paddingTop: '30px',
	'@media (max-width:1024px)': {
		padding: '0px',
	},
});

export const placeOrderOuter = () => ({
	flex: 3,
	'@media (max-width:1024px)': {
		width: '100%',
	},
});

export const placeOrderCheckOut = () => ({
	flex: 1,
	border: '1px solid gray',
	backgroundColor: 'white',
	height: '20%',
	margin: '20px',
	'@media (max-width:1024px)': {
		//width: '100%',
		width: 'calc(100% -  10px)',

		margin: '0px',
		padding:'4px',

	},
});

export const placeOrderElement = () => ({
	borderBottom: '1px solid gray',
	padding: '10px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export const placeOrderSecond = () => ({
	display: 'flex',
	flexWrap: 'wrap',
	'@media (max-width:1024px)': {
		display: 'flex',
		flexDirection: 'column',
	},
});
export const placeOrderTitleDesc = () => ({
	display: 'flex',
	flexWrap: 'wrap',
	'@media (max-width:1024px)': {
		display: 'flex',
		flexDirection: 'column',
	},
});

export const placeOrderPrice = () => ({
	display: 'flex',
	flexWrap: 'wrap',
	'@media (max-width:1024px)': {
		display: 'flex',
		flexDirection: 'column',
	},
});

export const placeOrderCartImage = () => ({
	width: '50px',
	height: '50px',
	'@media (max-width:1024px)': {
		width: '100%',
		height: '40%',
	},
});

export const placeOrderCartItemDesc = () => ({
	width: '30%',
	flexWrap: 'wrap',
	fontWeight: 'bold',
	'@media (max-width:1024px)': {
		width: '100%',
	},
});

export const placeOrderCartItemPrice = () => ({
	width: '30%',
	fontWeight: 'bold',
	'@media (max-width:1024px)': {
		width: '100%',
	},
});

