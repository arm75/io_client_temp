import { useAtomValue } from "jotai"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { socketAtom } from "../../../app/atoms/socketAtom"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function SocketEventsStateContainer({ children }: any) {
	if (RENDER_LOG === "true") console.log("<SocketEventsStateContainer> rendered...")

	const queryClient = useQueryClient()

	const socket = useAtomValue(socketAtom)

	useEffect(() => {
		if (socket) {
			const startNewGame = (data: any) => {
				console.log("Received startNewGame event:", data)
				startNewGame(data)
			}

			const gamePlayerAdded = (data: any) => {
				console.log("gamePlayerAdded event:", data)
				queryClient.invalidateQueries(["get-all-games"])
			}

			const turnChanged = (data: any) => {
				console.log("turnChanged event:", data)
				queryClient.invalidateQueries(["get-current-game"])
				//queryClient.refetchQueries(["get-game-in-progress"])
			}

			const turnPlayed = (data: any) => {
				console.log("turnPlayed event:", data)
				queryClient.invalidateQueries(["get-current-game"])
				//queryClient.refetchQueries(["get-game-in-progress"])
			}

			const gameEnded = (data: any) => {
				console.log("Received endGame event:", data)
				window.location.href = "/"
			}

			socket.on("startNewGame", startNewGame)
			socket.on("gamePlayerAdded", gamePlayerAdded)
			socket.on("turnChanged", turnChanged)
			socket.on("turnPlayed", turnPlayed)
			socket.on("gameEnded", gameEnded)

			console.log("useEffect in SocketEventsStateContainer RAN...")

			return () => {
				socket.off("startNewGame", startNewGame)
				socket.off("gamePlayerAdded", gamePlayerAdded)
				socket.off("turnChanged", turnChanged)
				socket.off("turnPlayed", turnPlayed)
				socket.off("gameEnded", gameEnded)

				console.log("useEffect in SocketEventsStateContainer DISMOUNTED...")
			}
		}
	}, [queryClient, socket])

	return <>{children}</>
}
