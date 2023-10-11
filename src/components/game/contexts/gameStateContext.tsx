import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, useContext, useEffect, useState } from "react"
import useAxios from "../../../app/api/axios"
import IUser from "../../../models/interfaces/user"
import { useAuthContext } from "../../../app/auth/authContext"
import IGame from "../../../models/interfaces/game/board/game"

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
	//const queryClient = useQueryClient()

	const api = useAxios()

	let content: JSX.Element = <></>

	const authContextData = useAuthContext()

	const [currentGameId, setCurrentGameId] = useState<string>("")
	const [currentGame, setCurrentGame] = useState<Partial<IGame>>({})
	const [playerObject, setPlayerObject] = useState({})
	const gameInProgress = currentGameId !== null

	const getInProgressGameQuery = useQuery(
		["get-game-in-progress"],
		async () =>
			await api
				.get(`/game/${currentGameId}`)
				.then((res) => res.data)
				.then((something) => {
					//console.log("SOMETHING", something)
					return something
				}),
		{
			onSettled: (data) => {
				//console.log("QUERY I AM INTERESTED IN: ", data)
				console.log("Get-game-query is providing: ", data)
				setCurrentGame(data[0])
			},
			//enabled: Boolean(authContextData.currentGameId),
			refetchOnWindowFocus: false,
		}
	)

	useEffect(() => {
		if (authContextData) {
			const gameId = authContextData?.currentGameId as string
			setCurrentGameId(gameId)
		} else {
			setCurrentGameId("")
		}
	}, [authContextData])

	useEffect(() => {
		if (currentGame) {
			const playersToSearch: any = currentGame?.players
			setPlayerObject(playersToSearch?.find((player: any) => player.user._id === authContextData.id))
		} else {
			setPlayerObject({})
		}
	}, [authContextData.id, currentGame])

	// useEffect(() => {
	// 	const player =
	//  },[])

	const startNewGame = (gameId: string) => {
		setCurrentGameId(gameId)
		//queryClient.invalidateQueries(["get-game-in-progress"])
		getInProgressGameQuery.refetch()
		const gameStateObjectToSet = { currentGameId: gameId }
		// Convert the object to a JSON string
		const jsonString = JSON.stringify(gameStateObjectToSet)
		// Store the JSON string in localStorage under a specific key
		localStorage.setItem("gameStateObject", jsonString)
		window.location.href = "/game/play"
	}

	// Provide the state and functions through the context
	const contextValue = {
		gameInProgress,
		currentGameId,
		currentGame,
		startNewGame,
		playerObject,
	}

	if (getInProgressGameQuery.isLoading || getInProgressGameQuery.isFetching) {
		content = <></>
	}

	if (getInProgressGameQuery.isError) {
		content = <></>
	}

	if (getInProgressGameQuery.isSuccess) {
		content = (
			<>
				<GameStateContext.Provider value={contextValue}>{children}</GameStateContext.Provider>
			</>
		)
	}

	return content
}
