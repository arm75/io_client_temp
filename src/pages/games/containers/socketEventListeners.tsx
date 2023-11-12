import { useAtomValue } from "jotai"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { socketAtom } from "../../../app/atoms/socketAtom"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function SocketEventListeners({ children }: any) {
	if (RENDER_LOG === "true") console.log("<SocketEventsStateContainer> for GAMES rendered...")

	const queryClient = useQueryClient()

	const socket = useAtomValue(socketAtom)

	useEffect(() => {
		if (socket) {
			const startGame = (data: any) => {
				console.log("Received startGame event:", data)
			}

			const playerAdded = (data: any) => {
				console.log("playerAdded event:", data)
				queryClient.invalidateQueries(["get-all-games"])
			}

			socket.on("startGame", startGame)
			socket.on("playerAdded", playerAdded)

			return () => {
				socket.off("startGame", startGame)
				socket.off("gamePlayerAdded", playerAdded)
			}
		}
	}, [queryClient, socket])

	return <>{children}</>
}
