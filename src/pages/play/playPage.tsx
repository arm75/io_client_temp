import RenderBoard from "../../components/game/board/renderBoard"
import { useCurrentGame } from "./queries/useCurrentGame"
import { useAuthMe } from "../../app/auth/useAuthMe"
import { useEffect, useState } from "react"
import GameControls from "./components/gameControls"
import ChoosePositionDialog from "./dialogs/choosePositionDialog"
import { Button } from "../../components/shadcn/ui/button"
import SocketEventListeners from "./containers/socketEventListeners"
import { atomWithMachine } from "jotai-xstate"
import turnMachine from "./machines/turnMachine"
import { useAtom } from "jotai"
import { inspect } from "@xstate/inspect"
import RenderPlayerLetters from "./components/controls/renderPlayerLetters"
import ChatBox from "../../components/chat/chatBox"
import RenderTurnScoreTable from "./components/display/renderTurnScoreTable"

//inspect()

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

const turnMachineAtom = atomWithMachine(turnMachine, { devTools: true })

export default function PlayPage() {
	if (RENDER_LOG === "true") console.log("<PlayPage> rendered...")

	const [turnState, sendTurnState] = useAtom(turnMachineAtom)

	//const [letters, setLetters] = useState(["A", "G", "T", "Y", "U", "I", "R", "T"])

	let content = <></>

	const authMeQueryData = useAuthMe()

	const currentGameQueryData = useCurrentGame(authMeQueryData.data?.currentGameId)

	const [showChoosePositionModal, setShowChoosePositionModal] = useState(false)

	console.log(turnState.value)

	useEffect(() => {
		const handleBeforeUnload = (e: any) => {
			console.log({ e })
			const currentLocation = window.location.pathname
			console.log({ currentLocation })
			// Check if the current location is '/game/play'
			if (currentLocation === "/game/play") {
				// Run your function here
				// This code will execute when navigating away from '/game/play', not during a page reload
				// For example, you can show a confirmation message or save data before leaving
				console.log("A reload has ocurred...")
				//pause(5000)
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

	content = (
		<>
			<SocketEventListeners>
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
							{/* <hr className="text-emerald-900 my-10"></hr> */}
							<RenderTurnScoreTable players={currentGameQueryData?.data?.players} />
							<RenderPlayerLetters
								letters={
									currentGameQueryData?.data?.players.find(
										(player: any) => player.user._id.toString() === authMeQueryData?.data?.id
									).letters
								}
							/>
							<GameControls />
							<Button onClick={() => setShowChoosePositionModal(true)}>Choose Position Modal</Button>
						</div>
						<div className="row-start-7 row-end-11 bg-slate-700 p-8">
							<p className="text-white text-xl pb-2">Game Chat</p>
							<ChatBox />
						</div>
					</div>
				</div>
			</SocketEventListeners>
			<ChoosePositionDialog
				isOpen={showChoosePositionModal}
				//isOpen={turnState.matches({ TURN: "CHOOSING_POSITION" })}
				onClose={() => {
					setShowChoosePositionModal(false)
				}}
				title="Choose Position"
				description="Please choose word position."
			/>
		</>
	)

	return content
}
