import RenderBoard from "../../components/game/board/renderBoard"
import GameLayoutControls from "../../app/layouts/game/gameLayoutControls"
import SocketEventsStateContainer from "./containers/socketEventsStateContainer"
import { useCurrentGame } from "./queries/useCurrentGame"
import { useAuthMe } from "../../app/auth/useAuthMe"
import { useEffect } from "react"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function PlayPage() {
	if (RENDER_LOG === "true") console.log("<PlayPage> rendered...")

	let content = <></>

	//const queryClient = useQueryClient()

	//const authQueryData: any = queryClient.getQueryData(["auth-me"])

	//const api = useAxios()

	//const queryClient = useQueryClient()
	//const { gameInProgress, currentGameId, currentGame, startNewGame } = useGameStateContext()

	//console.log("LOOKBRO-->: ", currentGame.board)
	//const [currentGameId, setCurrentGameId] = useState("65386bc9bbc29a896541aa94")
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

	const authMeQueryData = useAuthMe()

	const currentGameQueryData = useCurrentGame(authMeQueryData.data?.currentGameId)

	useEffect(() => {
		const handleBeforeUnload = (e: any) => {
			console.log({ e })
			const currentLocation = window.location.pathname
			console.log({ currentLocation })
			// Check if the current location is '/game/play'
			if (currentLocation === "/game/play") {
				console.log("A reload has ocurred...")
				// Run your function here
				// This code will execute when navigating away from '/game/play', not during a page reload
				// For example, you can show a confirmation message or save data before leaving
			} else {
				console.log("A navigation away has occurred...")
			}
			// Optionally set a confirmation message (not allowed in all browsers)
			//e.preventDefault()
			//e.returnValue = "" // Display a message (not guaranteed in all browsers)
		}

		window.addEventListener("beforeunload", handleBeforeUnload)

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload)
		}
	}, [])

	//if (authMeQueryData?.data?.currentGameId && gameInProgressQueryData?.data) {
	// if (authMeQueryData?.data?.currentGameId && currentGameQueryData?.data) {
	content = (
		<>
			<SocketEventsStateContainer>
				<div className="grid grid-cols-12 h-screen">
					<div className="col-span-6 h-full bg-emerald-600 px-8 pt-2 pb-8">
						{authMeQueryData?.data?.currentGameId && currentGameQueryData?.data?.board ? (
							<RenderBoard
								gameId={authMeQueryData?.data?.currentGameId}
								boardToRender={currentGameQueryData?.data?.board}
							/>
						) : (
							<>
								<h1>NO GAME IN PROGRESS</h1>
							</>
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
			</SocketEventsStateContainer>
		</>
	)
	// } else {
	// 	content = <></>
	// }

	return content
}
