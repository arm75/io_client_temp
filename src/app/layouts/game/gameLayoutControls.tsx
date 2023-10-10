import { useQueryClient } from "@tanstack/react-query"
import { useBoardHoverContext } from "../../../components/game/contexts/boardHoverContext"
import IUser from "../../../models/interfaces/user"
import { useEffect, useState } from "react"
import { Button } from "../../../components/shadcn/ui/button"
import { useSocketContext } from "../../context/socketContext"
import { useGameStateContext } from "../../../components/game/contexts/gameStateContext"
import { useAuthContext } from "../../auth/authContext"
import IGame from "../../../models/interfaces/game/board/game"

export default function GameLayoutControls(props: any) {
	// const {children, pageTitle} = props

	const [gameId, setGameId] = useState<any>({})
	const [game, setGame] = useState<Partial<IGame>[]>([{}])
	const [me, setMe] = useState<Partial<IUser>>({})
	const [playerObj, setPlayerObj] = useState<any>({})

	const socket = useSocketContext()
	const gameStateContextData = useGameStateContext()
	const authContextData = useAuthContext()
	const { hoverCoordinates, hoverCookieColor, hoverCookie } = useBoardHoverContext()

	// const queryClient = useQueryClient()
	// const gameInProgressQueryData: any = queryClient.getQueryData(["get-game-in-progress"])
	// const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

	//console.log(gameStateContextData)
	//console.log("ME: ", me)

	useEffect(() => {
		if (authContextData) {
			const meToSet = authContextData as Partial<IUser>
			setMe(meToSet)
		} else {
			setMe({})
		}
	}, [authContextData])

	useEffect(() => {
		if (gameStateContextData && me) {
			const gameIdToSet = gameStateContextData?.currentGameId as string
			setGameId(gameIdToSet)
			const gameToSet = gameStateContextData?.currentGame as Partial<IGame>[]
			setGame(gameToSet)
		} else {
			setGameId("")
			setGame([{}])
		}
	}, [gameStateContextData, me])

	useEffect(() => {
		if (game && me) {
			console.log("inside if")
			const playersToSearch = game[0]?.players
			console.log({ playersToSearch })
			setPlayerObj(
				playersToSearch?.find((player: any) => {
					console.log("PLAYERRRR", player)
					return player.user._id === me.id
				})
			)
		} else {
			setPlayerObj({})
		}
	}, [game, me])

	const handlePassTurn = (id: any) => {
		socket.emit("passTurn", { gameId, playerId: id })
	}

	// console.log({ me })
	// console.log({ gameId })
	// console.log({ game })
	// console.log({ playerObj })

	return (
		<>
			{/* <!-- Logo Section --> */}
			<div className="flex justify-center pt-4 pl-2 mb-8">
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
			<h1 className="text-slate-500 text-4xl">
				Current Cell:{" "}
				<span className="text-emerald-500 text-5xl">
					{hoverCoordinates.row}, {hoverCoordinates.col}
				</span>
				<br />
				Current Cookie Color: <span className="text-emerald-500 text-5xl">{hoverCookieColor}</span>
				<br />
				Current Cookie: <span className="text-emerald-500 text-5xl">{hoverCookie}</span>
				<br />
				{playerObj?.turn ? (
					<>
						YOUR TURN
						<br />
						<Button
							onClick={() => {
								handlePassTurn(playerObj._id)
							}}
						>
							Pass Turn
						</Button>
					</>
				) : (
					<></>
				)}
			</h1>
			{/* <DisplayMyLetters />
			<StateMachineComponent2 /> */}
		</>
	)
}
