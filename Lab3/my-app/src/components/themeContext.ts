import React from 'react';
export const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: 'blue',
        background: '#222222',
    },
};
export const ThemeContext = React.createContext(themes.light);