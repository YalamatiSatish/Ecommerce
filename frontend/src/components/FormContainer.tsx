import React from 'react';

type Props = {
	children: React.ReactNode;
};
const FormContainer = ({ children }: Props) => {
	return <div>{children}</div>;
};

export default FormContainer;
