"use client"

import React from 'react'

type ThemeContextType = {
    mode: string
    setMode: (mode: string) => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

const ThemeProvider = ({ children }: React.PropsWithChildren) => {
    const [mode, setMode] = React.useState('')


    const handleThemeChange = () => {
        if (mode === 'dark') {
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