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
export const cartImage = () => ({
	width: '125px', height: '125px',
	'@media (max-width:767px)': {
		width: '100%', height: '125px',

	},
});
// LogInScreen
export const logInFormOuter = () => ({
	display: 'flex',
	flexDirection: 'column',
	width: '350px',
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
