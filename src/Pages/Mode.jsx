import React, { useEffect, useState } from 'react';

export const Mode = () => {
    const [mode, setMode] = useState("light");

    // Function to toggle the theme
    const changeTheme = () => {
        const html = document.documentElement;

        if (mode === "light") {
            html.classList.remove("light");
            html.classList.add("dark");
            setMode("dark");
            localStorage.setItem("mode", "dark");
        } else {
            html.classList.remove("dark");
            html.classList.add("light");
            setMode("light");
            localStorage.setItem("mode", "light");
        }
    };

    // Initialize the theme from localStorage on component mount
    useEffect(() => {
        const currentMode = localStorage.getItem("mode") || "light";
        document.documentElement.classList.add(currentMode);
        setMode(currentMode);
    }, []);

    return {changeTheme, mode}
};

