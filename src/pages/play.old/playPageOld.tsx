import RenderBoard from "../../components/game/board/renderBoard"
import { BoardHoverContextProvider } from "../../components/game/contexts/boardHoverContext"
import GameLayoutControls from "../../app/layouts/game/gameLayoutControls"
import ChatBox from "../../components/chat/chatBox"
import { useGameStateContext } from "../../components/game/contexts/gameStateContext"
import { useState } from "react"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function PlayPageOld(props: any) {
	if (RENDER_LOG === "true") console.log("<PlayPage> rendered...")

	let content: JSX.Element = <></>

	//const { gameInProgress, currentGameId, currentGame, startNewGame } = useGameStateContext()

	//console.log("LOOKBRO-->: ", currentGame.board)
	const [currentGameId, setCurrentGameId] = useState(true)
	const [currentGame, setCurrentGame] = useState(true)

	if (currentGameId && currentGame) {
		content = (
			<>
				<BoardHoverContextProvider>
					<div className="grid grid-cols-12 h-screen">
						<div className="col-span-6 h-full bg-emerald-600 px-8 pt-2 pb-8">
							{/* {currentGameId && currentGame?.board ? (
								<RenderBoard
									gameId={currentGameId}
									boardToRender={currentGame.board}
								/>
							) : (
								<></>
							)} */}
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
				</BoardHoverContextProvider>
			</>
		)
	} else {
		content = <></>
	}

	return content
}
