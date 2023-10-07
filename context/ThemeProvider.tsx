"use client"

import React from 'react'

type ThemeMode = 'light' | 'dark' | 'system'

type ThemeContextType = {
    mode: ThemeMode
    setMode: (mode: ThemeMode) => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

const ThemeProvider = ({ children }: React.PropsWithChildren) => {
    const [mode, setMode] = React.useState<ThemeMode>('system')

    const handleThemeChange = () => {
        if (localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setMode('dark')
            document.documentElement.classList.add('dark')
        } else {
            setMode('light')
            document.documentElement.classList.remove('dark')
        }
    }

    React.useEffect(() => {
        handleThemeChange()
    }, [mode])

    const value = {
        mode,
        setMode
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = React.useContext(ThemeContext)

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return context
}

export default ThemeProvider