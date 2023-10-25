import RenderBoard from "../../components/game/board/renderBoard"
import GameLayoutControls from "../../app/layouts/game/gameLayoutControls"
import { useEffect, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import useAxios from "../../app/api/axios"
import { useAtomValue } from "jotai"
import { socketAtom } from "./atoms/socketAtoms"
import { useAuthContext } from "../../app/auth/authContext"
//import ChatBox from "../../components/chat/chatBox"
//import { useGameStateContext } from "../../components/game/contexts/gameStateContext"
//import { BoardHoverContextProvider } from "../../components/game/contexts/boardHoverContext"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function PlayPage(props: any) {
	if (RENDER_LOG === "true") console.log("<PlayPage> rendered...")

	let content: React.JSX.Element = <></>

	const authContextData = useAuthContext()

	const api = useAxios()

	//const queryClient = useQueryClient()
	//const { gameInProgress, currentGameId, currentGame, startNewGame } = useGameStateContext()

	//console.log("LOOKBRO-->: ", currentGame.board)
	const [currentGameId, setCurrentGameId] = useState("65386bc9bbc29a896541aa94")
	//const [currentGame, setCurrentGame] = useState(true)

	// const socket = useAtomValue(socketAtom)

	// useEffect(() => {
	// 	if (socket) {
	// 		const startNewGame = (data: any) => {
	// 			console.log("Received startNewGame event:", data)
	// 			//startNewGame(data)
	// 		}

	// 		const gamePlayerAdded = (data: any) => {
	// 			console.log("gamePlayerAdded event:", data)
	// 			queryClient.invalidateQueries(["get-all-games"])
	// 		}

	// 		const turnChanged = (data: any) => {
	// 			console.log("turnChanged event:", data)
	// 			queryClient.invalidateQueries(["get-game-in-progress"])
	// 			//queryClient.refetchQueries(["get-game-in-progress"])
	// 		}

	// 		const turnPlayed = (data: any) => {
	// 			console.log("turnPlayed event:", data)
	// 			queryClient.invalidateQueries(["get-game-in-progress"])
	// 			//queryClient.refetchQueries(["get-game-in-progress"])
	// 		}

	// 		const gameEnded = (data: any) => {
	// 			console.log("Received endGame event:", data)
	// 			window.location.href = "/"
	// 		}

	// 		socket.on("startNewGame", startNewGame)
	// 		socket.on("gamePlayerAdded", gamePlayerAdded)
	// 		socket.on("turnChanged", turnChanged)
	// 		socket.on("turnPlayed", turnPlayed)
	// 		socket.on("gameEnded", gameEnded)

	// 		return () => {
	// 			socket.off("startNewGame", startNewGame)
	// 			socket.off("gamePlayerAdded", gamePlayerAdded)
	// 			socket.off("turnChanged", turnChanged)
	// 			socket.off("turnPlayed", turnPlayed)
	// 			socket.off("gameEnded", gameEnded)
	// 		}
	// 	}
	// }, [queryClient, socket])

	// const hoverCoordinatesAtom = atom({ row: 0, col: 0 })
	// const hoverCookieColorAtom = atom("")
	// const hoverCookieAtom = atom("")

	// const [hoverCoordinates, setHoverCoordinates] = useState<any>({ row: 0, col: 0 })
	// const [hoverCookieColor, setHoverCookieColor] = useState("")
	// const [hoverCookie, setHoverCookie] = useState("")

	const getInProgressGameQuery = useQuery(
		["get-game-in-progress"],
		async () =>
			await api
				.get(`/game/${authContextData?.currentGameId}`)
				.then((res: any) => res.data)
				.then((something: any) => {
					//console.log("SOMETHING", something)
					return something
				}),
		{
			onSettled: (data) => {
				//console.log("QUERY I AM INTERESTED IN: ", data)
				console.log("Get-game-query is providing: ", data)
				//setCurrentGame(data[0])
			},
			enabled: Boolean(authContextData.currentGameId),
			refetchOnWindowFocus: false,
		}
	)

	if (authContextData.currentGameId && getInProgressGameQuery.data) {
		content = (
			<>
				{/* <SocketProviderNew> */}
				{/* <BoardHoverContextProvider> */}
				<div className="grid grid-cols-12 h-screen">
					<div className="col-span-6 h-full bg-emerald-600 px-8 pt-2 pb-8">
						{currentGameId && getInProgressGameQuery?.data?.board ? (
							<RenderBoard
								gameId={authContextData?.currentGameId}
								boardToRender={getInProgressGameQuery?.data?.board}
							/>
						) : (
							<></>
						)}
					</div>
					<div className="col-span-6 h-full grid grid-rows-10 bg-slate-900">
						<div className="row-start-1 row-end-7 bg-slate-600 p-8">
							<GameLayoutControls />
						</div>
						<div className="row-start-7 row-end-11 bg-slate-700 p-8">
							<p className="text-white text-xl pb-2">Game Chat</p>
							{/* <ChatBox /> */}
						</div>
					</div>
				</div>
				{/* </BoardHoverContextProvider> */}
				{/* </SocketProviderNew> */}
			</>
		)
	} else {
		content = <></>
	}

	return content
}
