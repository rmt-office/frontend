import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextWrapper } from './context/auth/authContext.tsx'
import { ThemeContextWrapper } from './context/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextWrapper>
				<ThemeContextWrapper>
					<App />
				</ThemeContextWrapper>
			</AuthContextWrapper>
		</BrowserRouter>
	</React.StrictMode>
)
