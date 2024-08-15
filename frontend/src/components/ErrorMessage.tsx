import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

type errorMsgProps = {
	children: string[];
};

const ErrorMessage = ({ children }: errorMsgProps) => {
	return (
		<Stack sx={{ width: '100%' }} spacing={2}>
			<Alert severity='warning' /* onClose={() => {}} */>
				{children}
			</Alert>
			<Alert
				severity='success'
				action={
					<Button color='inherit' size='small'>
						X
					</Button>
				}
			>
				Write something here
			</Alert>
		</Stack>
	);
};

export default ErrorMessage;
