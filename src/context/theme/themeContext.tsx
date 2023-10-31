import { useState, useEffect, createContext, ReactNode } from 'react'

const ThemeContext = createContext<null | {
	theme: 'dark' | 'light'
	toggleTheme: () => void
}>(null)

const ThemeContextWrapper = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<'dark' | 'light'>('light')

	const toggleTheme = () => {
		setTheme((prev) => {
			if (prev === 'light') {
				localStorage.setItem('theme', 'dark')
				return 'dark'
			}
			localStorage.setItem('theme', 'light')
			return 'light'
		})
	}

	useEffect(() => {
		const colorSchema = window.matchMedia('(prefers-color-scheme: dark)')
		const currentTheme = localStorage.getItem('theme') as 'light' | 'dark'
		if (currentTheme) {
			setTheme(currentTheme)
		} else if (colorSchema.matches) {
			setTheme('dark')
		}
	}, [])

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export { ThemeContext, ThemeContextWrapper }
