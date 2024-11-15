// useSystemTheme.ts
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

type systemTheme =  boolean/* 'light' | 'dark' */;

export const useSystemTheme = (): systemTheme => {
	// Detect if the system theme is set to dark mode
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	// Set the initial theme based on the media query
	const [theme, setTheme] = useState<systemTheme>(prefersDarkMode ? true /* 'dark' */ : false /* 'light' */);

	useEffect(() => {
		setTheme(prefersDarkMode ? true  : false/*  'dark' : 'light' */);
	}, [prefersDarkMode]);

	return theme;
};

