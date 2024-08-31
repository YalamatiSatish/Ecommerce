import React from 'react';
import { BoxProps, Tooltip, Box } from '@mui/material';

interface ToolTipProps extends BoxProps {
	title?: string;
	titleAsHTML?: React.ReactNode;
	TooltipColor?: string;
	offset?: number[];
}

const CustomToolTip = ({
	titleAsHTML,
	title,
	children,
	TooltipColor = '#00354c',
	offset,
	...rest
}: ToolTipProps) => {
	return (
		<Box {...rest}>
			<Tooltip
				title={titleAsHTML || title}
				placement='bottom'
				slotProps={{
					tooltip: {
						sx: { maxWidth: 'none', backgroundColor: TooltipColor },
					},
				}}
				PopperProps={{
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: offset /* [0, 8] */,
							},
						},
					],
				}}
			>
				<Box className='' >{children}</Box>
			</Tooltip>
		</Box>
	);
};

export default CustomToolTip;
