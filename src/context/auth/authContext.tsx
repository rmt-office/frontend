import { useContext, useReducer, useState, useEffect, createContext, ReactNode } from 'react'

const AuthContext = createContext<null | string>(null)

const AuthContextWrapper = ({ children }: { children: ReactNode }) => {
	return <AuthContext.Provider value={{ type: 'test' }}>{children}</AuthContext.Provider>
}

export { AuthContextWrapper, AuthContext }
