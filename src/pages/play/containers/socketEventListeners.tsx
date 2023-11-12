import { useAtomValue } from "jotai"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { socketAtom } from "../../../app/atoms/socketAtom"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function SocketEventListeners({ children }: any) {
	if (RENDER_LOG === "true") console.log("<SocketEventsListeners> for PLAY rendered...")

	const queryClient = useQueryClient()

	const socket = useAtomValue(socketAtom)

	useEffect(() => {
		if (socket) {
			const turnChanged = (data: any) => {
				console.log("turnChanged event:", data)
				queryClient.invalidateQueries(["get-current-game"])
			}

			const turnPlayed = (data: any) => {
				console.log("turnPlayed event:", data)
				queryClient.invalidateQueries(["get-current-game"])
			}

			const gameEnded = (data: any) => {
				console.log("Received endGame event:", data)
				window.location.href = "/"
			}

			socket.on("turnChanged", turnChanged)
			socket.on("turnPlayed", turnPlayed)
			socket.on("gameEnded", gameEnded)

			return () => {
				socket.off("turnChanged", turnChanged)
				socket.off("turnPlayed", turnPlayed)
				socket.off("gameEnded", gameEnded)
			}
		}
	}, [queryClient, socket])

	return <>{children}</>
}
