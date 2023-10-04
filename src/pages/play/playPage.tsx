import useAxios from "../../app/api/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import RenderBoard from "../../components/game/board/renderBoard"
import GameLayout from "../../app/layouts/game/gameLayout"
import { BoardHoverContextProvider } from "../../components/game/contexts/boardHoverContext"
import IUser from "../../models/interfaces/user"

// Define action types for state transitions
const ActionTypes = {
	START_TURN: "START_TURN",
	CHOOSE_LETTER: "CHOOSE_LETTER",
	CHOOSE_CELL: "CHOOSE_CELL",
	READY_TO_SUBMIT: "READY_TO_SUBMIT",
}

// Define the reducer function to handle state transitions
const gameReducer = (state: any, action: any) => {
	switch (action.type) {
		case ActionTypes.START_TURN:
			return { ...state, yourTurn: true, currentState: "chooseLetter" }
		case ActionTypes.CHOOSE_LETTER:
			return { ...state, currentState: "chooseLetter" }
		case ActionTypes.CHOOSE_CELL:
			return { ...state, currentState: "chooseCell" }
		case ActionTypes.READY_TO_SUBMIT:
			return { ...state, currentState: "readyToSubmit" }
		default:
			return state
	}
}

export default function PlayPage(props: any) {
	const api = useAxios()

	let content: JSX.Element = <></>

	const queryClient = useQueryClient()

	const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

	const getInProgressGameQuery = useQuery(
		["get-game-in-progress"],
		async () =>
			await api
				.get(`/game/${authMeQueryData?.currentGameId}`)
				.then((res) => res.data)
				.then((something) => {
					//console.log("SOMETHING", something)
					return something
				}),
		{
			refetchOnWindowFocus: false,
		}
	)

	if (getInProgressGameQuery.isLoading || getInProgressGameQuery.isFetching) {
		content = <p>Loading...</p>
	}

	if (getInProgressGameQuery.isError) {
		content = <p className="errmsg">whatev</p>
	}

	if (getInProgressGameQuery.isSuccess) {
		content = (
			<>
				<BoardHoverContextProvider>
					<GameLayout pageTitle="Play Page">
						<RenderBoard
							gameId={getInProgressGameQuery.data._id}
							boardToRender={getInProgressGameQuery.data.board}
						/>
					</GameLayout>
				</BoardHoverContextProvider>
			</>
		)
	}

	return content
}
