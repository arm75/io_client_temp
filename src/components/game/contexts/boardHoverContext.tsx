import { createContext, useContext, useState } from "react"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

// Create the context
const BoardHoverContext = createContext<any>(null)

// Create a custom hook to access the context
export function useBoardHoverContext() {
	const context = useContext(BoardHoverContext)
	if (!context) {
		throw new Error("useGameContext must be used within <BoardHoverContextProvider/>")
	}
	return context
}

// Create the AppProvider component
export function BoardHoverContextProvider({ children }: { children: JSX.Element }) {
	if (RENDER_LOG === "true") console.log("<BoardHoverContextProvider> rendered...")
	const [hoverCoordinates, setHoverCoordinates] = useState<any>({ row: 0, col: 0 })
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

	return <BoardHoverContext.Provider value={contextValue}>{children}</BoardHoverContext.Provider>
}
