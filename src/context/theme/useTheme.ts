import { useContext } from 'react'
import { ThemeContext } from './themeContext'

export const useThemeValue = () => {
	const theme = useContext(ThemeContext)
	if (theme == null) {
		throw `Use inside the wrapper`
	}

	return theme
}
