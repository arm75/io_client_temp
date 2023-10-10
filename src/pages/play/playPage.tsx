import useAxios from "../../app/api/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import RenderBoard from "../../components/game/board/renderBoard"
import { BoardHoverContextProvider } from "../../components/game/contexts/boardHoverContext"
import IUser from "../../models/interfaces/user"
import GameLayoutControls from "../../app/layouts/game/gameLayoutControls"
import ChatBox from "../../components/chat/chatBox"
import { useGameStateContext } from "../../components/game/contexts/gameStateContext"
import { useEffect, useState } from "react"
import IGame from "../../models/interfaces/game/board/game"

export default function PlayPage(props: any) {
	//const api = useAxios()

	let content: JSX.Element = <></>

	const gameStateContextData = useGameStateContext()

	console.log("gameStateContext: ", gameStateContextData)

	const [currentGameId, setCurrentGameId] = useState<string>("")
	// const [currentGame, setCurrentGame] = useState<Array<Partial<IGame>>>([{}])

	useEffect(() => {
		const gameId = gameStateContextData?.currentGameId as string
		if (gameId) {
			setCurrentGameId(gameId)
		} else {
			setCurrentGameId("")
		}
	}, [gameStateContextData.currentGameId])

	// useEffect(() => {
	// 	const game = gameStateContextData?.currentGame as Array<Partial<IGame>>
	// 	if (game) {
	// 		setCurrentGame(game)
	// 	} else {
	// 		setCurrentGame([{}])
	// 	}
	// }, [gameStateContextData?.currentGame])

	if (currentGameId !== "") {
		content = (
			<>
				<BoardHoverContextProvider>
					<div className="grid grid-cols-12 h-screen">
						<div className="col-span-6 h-full bg-emerald-600 px-8 pt-2 pb-8">
							{currentGameId && gameStateContextData.currentGame[0].board ? (
								<RenderBoard
									gameId={currentGameId}
									boardToRender={gameStateContextData.currentGame[0].board}
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
								<ChatBox />
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
