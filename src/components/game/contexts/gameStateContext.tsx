import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, useContext, useEffect, useState } from "react"
import IUser from "../../../models/interfaces/user"
import useAxios from "../../../app/api/axios"

// Create the context
const GameStateContext = createContext<any>(null)

// Create a custom hook to access the context
export function useGameStateContext() {
	const context = useContext(GameStateContext)

	if (!context) {
		throw new Error("useGameContext must be used within <GameStateContextProvider/>")
	}
	return context
}

// Create the AppProvider component
export function GameStateContextProvider({ children }: { children: JSX.Element }) {
	//const [gameInProgress, setGameInProgress] = useState(false)

	//let content = <></>

	const [currentGameId, setCurrentGameId] = useState<string | null>(null)
	const gameInProgress = currentGameId !== null

	let content: JSX.Element = <></>

	const api = useAxios("http://localhost:3500")

	const authMeQueryData = useQuery(["auth-me"], async () => await api.get("auth/me").then((res: any) => res.data), {
		refetchOnWindowFocus: false,
	})

	//console.log(authMeQueryData)

	// useEffect(() => {
	// 	const inGameAlready = localStorage.getItem("gameStateObject")

	// 	if (inGameAlready) {
	// 		const gameState = JSON.parse(inGameAlready)

	// 		console.log("Object retrieved from localStorage:", gameState)
	// 		setCurrentGameId(gameState.currentGameId)
	// 	} else {
	// 		console.log("Object does not exist in localStorage.")
	// 	}
	// }, [currentGameId])

	const startNewGame = (gameId: string) => {
		//console.log(`Game ID: ${gameId}`)
		// Define an object to store in localStorage
		const gameStateObjectToSet = { currentGameId: gameId }
		// Convert the object to a JSON string
		const jsonString = JSON.stringify(gameStateObjectToSet)
		// Store the JSON string in localStorage under a specific key
		localStorage.setItem("gameStateObject", jsonString)
		//setCurrentGameId(gameId)
		window.location.href = "/game/play"
	}

	// Provide the state and functions through the context
	const contextValue = {
		gameInProgress,
		currentGameId,
		startNewGame,
		// hoverCoordinates,
		// setHoverCoordinates,
		// hoverCookieColor,
		// setHoverCookieColor,
		// hoverCookie,
		// setHoverCookie,
	}

	if (authMeQueryData.isLoading || authMeQueryData.isFetching) {
		content = <></>
	}

	if (authMeQueryData.isError) {
		content = <></>
	}

	if (authMeQueryData.isSuccess) {
		content = (
			<>
				<GameStateContext.Provider value={contextValue}>{children}</GameStateContext.Provider>
			</>
		)
	}
	return content
}
