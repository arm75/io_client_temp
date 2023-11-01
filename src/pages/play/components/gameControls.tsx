import { Button } from "../../../components/shadcn/ui/button"
import { useEffect, useState } from "react"
import { useAtomValue } from "jotai"
import { hoverCoordinatesAtom, hoverCookieColorAtom, hoverCookieAtom } from "../atoms/hoverAtoms"
import { useCurrentGame } from "../queries/useCurrentGame"
import { useAuthMe } from "../../../app/auth/useAuthMe"
import { socketAtom } from "../../../app/atoms/socketAtom"

export default function GameControls(props: any) {
	let content: JSX.Element = <></>

	const authMeQuery = useAuthMe()

	const currentGameQuery = useCurrentGame(authMeQuery.data?.currentGameId)

	const socket = useAtomValue(socketAtom)
	const hoverCoordinates = useAtomValue(hoverCoordinatesAtom)
	const hoverCookieColor = useAtomValue(hoverCookieColorAtom)
	const hoverCookie = useAtomValue(hoverCookieAtom)

	//const [currentGameId, setCurrentGameId] = useState(authMeQueryData?.currentGameId)
	//const [currentGame, setCurrentGame] = useState(true)
	const [playerObject, setPlayerObject] = useState<any>({})

	useEffect(() => {
		if (currentGameQuery?.data?.players) {
			const playersToSearch: any = currentGameQuery?.data?.players
			setPlayerObject(playersToSearch?.find((player: any) => player.user._id === authMeQuery?.data?.id))
		} else {
			setPlayerObject({})
		}
	}, [authMeQuery?.data?.id, currentGameQuery?.data?.players])

	const handlePassTurn = (currentGameId: any, playerId: any) => {
		socket.emit("passTurn", { currentGameId, playerId })
	}

	const handlePlayTurn = (currentGameId: any, playerId: any, cell: number, row: number, letter: string) => {
		socket.emit("playTurn", { currentGameId, playerId, cell, row, letter })
	}

	const handleEndGame = (currentGameId: any) => {
		socket.emit("endGame", currentGameId)
	}

	if (authMeQuery?.data?.currentGameId && currentGameQuery?.data) {
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
				{playerObject?.turn ? (
					<>
						<h1 className="text-3xl text-green-500">YOUR TURN</h1>
						<br />
						<Button
							className="bg-emerald-600 hover:bg-emerald-500 text-emerald-300 hover:text-white m-2"
							onClick={() => {
								handlePassTurn(authMeQuery?.data?.currentGameId, playerObject?._id)
							}}
						>
							Pass Turn
						</Button>
						<Button
							className="bg-emerald-600 hover:bg-emerald-500 text-emerald-300 hover:text-white m-2"
							onClick={() => {
								handleEndGame(authMeQuery?.data?.currentGameId)
							}}
						>
							END GAME
						</Button>
						<br />
						<Button
							className="bg-blue-600 hover:bg-blue-500 text-blue-300 hover:text-white m-2"
							onClick={() => {
								handlePlayTurn(authMeQuery?.data?.currentGameId, playerObject?._id, 8, 1, "F")
							}}
						>
							Play (8,1,F)
						</Button>
						<Button
							className="bg-blue-600 hover:bg-blue-500 text-blue-300 hover:text-white m-2"
							onClick={() => {
								handlePlayTurn(authMeQuery?.data?.currentGameId, playerObject?._id, 8, 1, "")
							}}
						>
							Remove (8,1,F)
						</Button>
						<Button
							className="bg-amber-600 hover:bg-amber-500 text-amber-300 hover:text-white m-2"
							onClick={() => {
								handlePlayTurn(authMeQuery?.data?.currentGameId, playerObject?._id, 2, 1, "V")
							}}
						>
							Play (2,1,V)
						</Button>
						<Button
							className="bg-amber-600 hover:bg-amber-500 text-amber-300 hover:text-white m-2"
							onClick={() => {
								handlePlayTurn(authMeQuery?.data?.currentGameId, playerObject?._id, 2, 1, "")
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
				{/* {playerObject?.letters ? (
					<>
						<h6>YOUR LETTERS</h6>
						<DisplayMyLetters letters={playerObject?.letters} />
					</>
				) : (
					<></>
				)} */}
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
