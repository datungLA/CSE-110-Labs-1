import React, { useState } from 'react';

export const themes = {
 light: {
   foreground: '#000000',
   background: '#eeeeee',
 },
 dark: {
   foreground: '#d3d3d3',
   background: '#222222',
 },
};

export const ThemeContext = React.createContext(themes.light);

 