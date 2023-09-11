import React, { createContext, useContext, useState } from "react"

// Create the context
const GameContext = createContext<any>(null)

// Create a custom hook to access the context
export function useGameContext() {
	const context = useContext(GameContext)
	if (!context) {
		throw new Error("useGameContext must be used within <GameContextProvider/>")
	}
	return context
}

// Create the AppProvider component
export function GameContextProvider({ children }: { children: React.ReactNode }) {
	const [hoverCoordinates, setHoverCoordinates] = useState<any>({
		// Initialize your context state here
		// For example:
		row: 0,
		col: 0,
	})

	const [hoverCookieColor, setHoverCookieColor] = useState("")
	const [hoverCookie, setHoverCookie] = useState("")

	// Define the function you want to make available to nested components
	// const setHoverPosition = (row: number, col: number) => {
	// 	console.log("setHoverPosition ran.")
	// 	setState((prevState: any) => ({
	// 		...prevState,
	// 		row,
	// 		col,
	// 	}))
	// }

	// Provide the state and functions through the context
	const contextValue = {
		hoverCoordinates,
		setHoverCoordinates,
		hoverCookieColor,
		setHoverCookieColor,
		hoverCookie,
		setHoverCookie,
	}

	return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
}
