import { createContext, useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import { useGameStateContext } from "../../components/game/contexts/gameStateContext"
import { useQueryClient } from "@tanstack/react-query"

const SOCKET_SERVER = import.meta.env.VITE_APP_BASE_URL
const SocketContext = createContext<any>(null)

export function useSocketContext() {
	return useContext(SocketContext)
}

export function SocketContextProvider({ children }: { children: JSX.Element }) {
	const initialSocket = io(SOCKET_SERVER, {
		withCredentials: true,
	}) // Initialize the socket
	const [socket, setSocket] = useState(initialSocket)

	const queryClient = useQueryClient()
	const { startNewGame } = useGameStateContext()

	// useEffect(() => {
	// 	setSocket(socket)
	// }, [socket])

	useEffect(() => {
		socket.on("startNewGame", (data) => {
			console.log("Received startNewGame event:", data)
			startNewGame(data)
		})

		socket.on("gamePlayerAdded", (data) => {
			console.log("gamePlayerAdded event:", data)
			queryClient.invalidateQueries(["get-all-games"])
		})

		socket.on("turnChanged", (data) => {
			console.log("turnChanged event:", data)
			queryClient.invalidateQueries(["get-game-in-progress"])
			queryClient.refetchQueries(["get-game-in-progress"])
		})

		socket.on("turnPlayed", (data) => {
			console.log("turnPlayed event:", data)
			queryClient.invalidateQueries(["get-game-in-progress"])
			queryClient.refetchQueries(["get-game-in-progress"])
		})

		return () => {
			socket.off("startNewGame")
		}
	}, [socket])

	useEffect(() => {
		return () => {
			socket.disconnect()
		}
	}, [socket])

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
