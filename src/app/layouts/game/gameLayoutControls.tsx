import { useBoardHoverContext } from "../../../components/game/contexts/boardHoverContext"
import { Button } from "../../../components/shadcn/ui/button"
import { useSocketContext } from "../../context/socketContext"
import { useGameStateContext } from "../../../components/game/contexts/gameStateContext"
import { useAuthContext } from "../../auth/authContext"
import DisplayMyLetters from "../../../components/game/controls/displayMyLetters"

export default function GameLayoutControls(props: any) {
	// const {children, pageTitle} = props

	let content: JSX.Element = <></>

	// const [gameId, setGameId] = useState<any>({})
	// const [game, setGame] = useState<Partial<IGame>[]>([{}])
	// const [me, setMe] = useState<Partial<IUser>>({})
	// const [playerObj, setPlayerObj] = useState<any>({})

	const socket = useSocketContext()
	const { gameInProgress, currentGameId, currentGame, startNewGame, playerObject } = useGameStateContext()
	const authContextData = useAuthContext()
	const { hoverCoordinates, hoverCookieColor, hoverCookie } = useBoardHoverContext()

	// const queryClient = useQueryClient()
	// const gameInProgressQueryData: any = queryClient.getQueryData(["get-game-in-progress"])
	// const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

	//console.log(gameStateContextData)
	//console.log("ME: ", me)

	// useEffect(() => {
	// 	if (authContextData) {
	// 		const meToSet = authContextData as Partial<IUser>
	// 		setMe(meToSet)
	// 	} else {
	// 		setMe({})
	// 	}
	// }, [authContextData])

	// useEffect(() => {
	// 	if (gameStateContextData && me) {
	// 		const gameIdToSet = gameStateContextData?.currentGameId as string
	// 		setGameId(gameIdToSet)
	// 		const gameToSet = gameStateContextData?.currentGame as Partial<IGame>[]
	// 		setGame(gameToSet)
	// 	} else {
	// 		setGameId("")
	// 		setGame([{}])
	// 	}
	// }, [gameStateContextData, me])

	// useEffect(() => {
	// 	if (game && me) {
	// 		//console.log("inside if")
	// 		const playersToSearch = game[0]?.players
	// 		//console.log({ playersToSearch })
	// 		setPlayerObj(
	// 			playersToSearch?.find((player: any) => {
	// 				//console.log("PLAYERRRR", player)
	// 				return player.user._id === me.id
	// 			})
	// 		)
	// 	} else {
	// 		setPlayerObj({})
	// 	}
	// }, [game, me])

	const handlePassTurn = (playerId: any) => {
		//console.log({ currentGameId })
		//console.log({})
		socket.emit("passTurn", { currentGameId, playerId })
	}

	const handlePlayTurn = (playerId: any, cell: number, row: number, letter: string) => {
		socket.emit("playTurn", { currentGameId, playerId, cell, row, letter })
	}

	const handleEndGame = () => {
		socket.emit("endGame", currentGameId)
	}

	// console.log({ gameInProgress })
	// console.log({ currentGameId })
	// console.log({ currentGame })
	// console.log({ startNewGame })
	// console.log({ playerObject })

	if (currentGameId && currentGame) {
		content = (
			<>
				{/* <!-- Logo Section --> */}
				<div className="flex justify-center pt-4 pl-2 mb-4">
					<a
						href="/"
						className="flex title-font font-medium items-center text-gray-100 mb-4 md:mb-0"
					>
						{/* <!-- LOGO SVG GOES INSIDE SPAN --> */}
						{/* <span className="w-12 h-12 mr-2 pt-1 bg-violet-700 relative rounded-full"></span> */}

						{/* <!-- Theme Title --> */}
						<span className="text-3xl">
							<span className="text-emerald-400">InWord</span>OutWord
						</span>
					</a>
				</div>
				{/* <!-- "NAVIGATION" Label --> */}
				{/* <div className="text-gray-500 self-center uppercase">Navigation</div> */}
				<hr className="text-emerald-900 my-10"></hr>
				<h1 className="text-slate-500 text-xl">
					{playerObject?.turn ? (
						<>
							<h1 className="text-3xl text-green-500">YOUR TURN</h1>
							<br />
							<Button
								className="bg-emerald-600 hover:bg-emerald-500 text-emerald-300 hover:text-white m-2"
								onClick={() => {
									handlePassTurn(playerObject?._id)
								}}
							>
								Pass Turn
							</Button>
							<Button
								className="bg-emerald-600 hover:bg-emerald-500 text-emerald-300 hover:text-white m-2"
								onClick={() => {
									handleEndGame()
								}}
							>
								END GAME
							</Button>
							<br />
							<Button
								className="bg-blue-600 hover:bg-blue-500 text-blue-300 hover:text-white m-2"
								onClick={() => {
									handlePlayTurn(playerObject?._id, 1, 1, "F")
								}}
							>
								Play (1,1,F)
							</Button>
							<Button
								className="bg-blue-600 hover:bg-blue-500 text-blue-300 hover:text-white m-2"
								onClick={() => {
									handlePlayTurn(playerObject?._id, 1, 1, "")
								}}
							>
								Remove (1,1,F)
							</Button>
							<Button
								className="bg-amber-600 hover:bg-amber-500 text-amber-300 hover:text-white m-2"
								onClick={() => {
									handlePlayTurn(playerObject?._id, 2, 1, "V")
								}}
							>
								Play (2,1,V)
							</Button>
							<Button
								className="bg-amber-600 hover:bg-amber-500 text-amber-300 hover:text-white m-2"
								onClick={() => {
									handlePlayTurn(playerObject?._id, 2, 1, "")
								}}
							>
								Remove (2,1,V)
							</Button>
							<br />
							<br />
						</>
					) : (
						<>
							<h1 className="text-3xl text-red-600">NOT YOUR TURN</h1>
							<br />
						</>
					)}
				</h1>
				{playerObject?.letters ? (
					<>
						<h6>YOUR LETTERS</h6>
						<DisplayMyLetters letters={playerObject?.letters} />
					</>
				) : (
					<></>
				)}
				Current Cell:{" "}
				<span className="text-emerald-500 text-md">
					{hoverCoordinates.row}, {hoverCoordinates.col}
				</span>
				<br />
				Current Cookie Color: <span className="text-emerald-500 text-xl">{hoverCookieColor}</span>
				<br />
				Current Cookie: <span className="text-emerald-500 text-xl">{hoverCookie}</span>
				<br />
				{/* <StateMachineComponent2 /> */}
			</>
		)
	} else {
		content = <></>
	}

	return content
}
