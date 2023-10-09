import { useQueryClient } from "@tanstack/react-query"
import { useBoardHoverContext } from "../../../components/game/contexts/boardHoverContext"
import IUser from "../../../models/interfaces/user"
import { useEffect, useState } from "react"
import { Button } from "../../../components/shadcn/ui/button"
import { useSocketContext } from "../../context/socketContext"
import StateMachineComponent from "../../../components/game/tests/turnStateTest"
import StateMachineComponent2 from "../../../components/game/tests/turnStateTest2"
import shuffleTokens from "../../../components/game/utils/shuffleTokens"
import DisplayMyLetters from "../../../components/game/controls/displayMyLetters"

const qtyMap = new Map([
	["A", 8],
	["B", 2],
	["C", 2],
	["D", 4],
	["E", 12],
	["F", 2],
	["G", 3],
	["H", 2],
	["I", 9],
	["J", 1],
	["K", 1],
	["L", 4],
	["M", 2],
	["N", 6],
	["O", 8],
	["P", 2],
	["Q", 1],
	["R", 6],
	["S", 4],
	["T", 6],
	["U", 2],
	["V", 2],
	["W", 2],
	["X", 1],
	["Y", 2],
	["Z", 1],
])

export default function GameLayoutControls(props: any) {
	// const {children, pageTitle} = props
	const socket = useSocketContext()
	//let content: JSX.Element = <></>
	const queryClient = useQueryClient()
	// const queryClient = useQueryClient()
	const gameInProgressQueryData: any = queryClient.getQueryData(["get-game-in-progress"])
	const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

	const { hoverCoordinates, hoverCookieColor, hoverCookie } = useBoardHoverContext()

	console.log(gameInProgressQueryData)

	const [gameId, setGameId] = useState<any>({})
	const [me, setMe] = useState<any>({})

	console.log("ME: ", me)

	useEffect(() => {
		console.log("hello")
		const myId = authMeQueryData?.id
		setGameId(gameInProgressQueryData._id)
		setMe(gameInProgressQueryData.players.find((player: any) => player.user._id === myId))
	}, [authMeQueryData, gameInProgressQueryData])

	const handlePassTurn = (id: any) => {
		socket.emit("passTurn", { gameId, playerId: id })
	}

	// if (gameInProgressQueryData.isLoading || gameInProgressQueryData.isFetching) {
	// 	content = <p>Loading...</p>
	// }

	// if (gameInProgressQueryData.isError) {
	// 	content = <p className="errmsg">whatev</p>
	// }

	// if (gameInProgressQueryData.isSuccess) {
	// 	content = (
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
				{me?.turn ? (
					<>
						YOUR TURN
						<br />
						<Button
							onClick={() => {
								handlePassTurn(me._id)
							}}
						>
							Pass Turn
						</Button>
					</>
				) : (
					<></>
				)}
			</h1>
			<DisplayMyLetters />
			<StateMachineComponent2 />
		</>
	)
}
