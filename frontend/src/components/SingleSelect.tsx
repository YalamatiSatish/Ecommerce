import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { OptionType } from '../types';
import { singleSelectInput } from './style';
export interface SingleSelectProps {
	options: OptionType[];
    value : OptionType | null;
    setValue : React.Dispatch<React.SetStateAction<OptionType | null>>
}
export default function SingleSelect({ options, value, setValue }: SingleSelectProps) {
	//const [value, setValue] = React.useState<OptionType | null>(options[0]);
	//const [inputValue, setInputValue] = React.useState('');
	console.log(value, 'check', );
	return (
		<Autocomplete
			disablePortal
			value={value}
			onChange={(event: any, newValue: OptionType | null) => {
				setValue(newValue);
			}}
			/* inputValue={inputValue}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}} */
			id='combo-box-demo'
			options={options}
			sx={{ width: '100%' }}
			renderInput={(params) => (
				<TextField
					{...params}
					/* label='Movie' */ placeholder='Select an Option'
					sx={singleSelectInput}
				/>
			)}
			getOptionLabel={(option) => option.label}
		/>
	);
}
