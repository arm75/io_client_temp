import RenderBoard from "../../components/game/board/renderBoard"
import SocketEventsStateContainer from "./containers/socketEventsStateContainer"
import { useCurrentGame } from "./queries/useCurrentGame"
import { useAuthMe } from "../../app/auth/useAuthMe"
import { useEffect } from "react"
import GameControls from "./components/gameControls"
import pause from "../../app/utils/pause"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function PlayPage() {
	if (RENDER_LOG === "true") console.log("<PlayPage> rendered...")

	let content = <></>

	const authMeQueryData = useAuthMe()

	const currentGameQueryData = useCurrentGame(authMeQueryData.data?.currentGameId)

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
							<GameControls />
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

	return content
}
