import { useState, useContext, useEffect } from 'react';
import { ThemeContext, themes } from './themeContext';
export function ClickCounter() {
    const [count, setCount] = useState(0);
    const theme = useContext(ThemeContext);
    return (
        <div
            style={{
                background: theme.background,
                color: theme.foreground,
                padding: "20px",
            }}
        >
            <p>You clicked {count} times</p>
            <button
                onClick={() => setCount(count + 1)}
                style={{ background: theme.background, color: theme.foreground }}
            >
                Click Me!
            </button>
        </div>
    );
}
export function ToggleTheme() {
    const [currentTheme, setCurrentTheme] = useState(themes.light);

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };
    useEffect(() => {
        document.body.style.backgroundColor = currentTheme.background;
        document.body.style.color = currentTheme.foreground;
    }, [currentTheme]);
    return (
        <ThemeContext.Provider value={currentTheme}>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </ThemeContext.Provider>
    );
}