import useAxios from "../../app/api/axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import RenderBoard from "../../components/game/board/renderBoard"
import GameLayout from "../../app/layouts/game/gameLayout"
import { BoardHoverContextProvider } from "../../components/game/contexts/boardHoverContext"
import { useGameStateContext } from "../../components/game/contexts/gameStateContext"
import IUser from "../../models/interfaces/user"

export default function PlayPage(props: any) {
	//const gameId = 1

	//const boardToRender = 1

	//const { currentGameId } = useGameStateContext()

	//const currentGameId = "6510a8cf2b2824976cd2e441"

	//console.log(currentGameId)

	let content: JSX.Element = <></>

	const api = useAxios("http://localhost:3500/")

	const queryClient = useQueryClient()

	const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

	//console.log("LOOK:", authMeQueryData)
	// const authMeQueryData = useQuery(["auth-me"], async () => await api.get("auth/me").then((res: any) => res.data), {
	// 	refetchOnWindowFocus: false,
	// })

	const getInProgressGameQuery = useQuery(
		["get-game-in-progress"],
		async () =>
			await api
				.get(`game/${authMeQueryData?.currentGameId}`)
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
		//const usersData = []

		// setTimeout(() => {
		//console.log({ getInProgressGameQuery })
		// }, 5000)

		// transform data for table. needs to be extracted out to custom function...
		// for (const objKey in getInProgressGameQuery.data) {
		// 	const obj: any = getInProgressGameQuery.data[objKey]
		// 	usersData.push({
		// 		id: obj._id,
		// 		username: obj.username,
		// 		// password: obj.password,
		// 		// roles: obj.roles.toString().replaceAll(',', ', '),
		// 		// rolesArray: obj.roles
		// 	})
		// }

		content = (
			<>
				<BoardHoverContextProvider>
					<GameLayout pageTitle="Play Page">
						<RenderBoard
							gameId={getInProgressGameQuery.data._id}
							boardToRender={getInProgressGameQuery.data.board}
						/>
						{/* <TestBoard/>
					<DialogDemo/>
					<DemoTablePage></DemoTablePage> */}
					</GameLayout>
				</BoardHoverContextProvider>
			</>
		)
	}

	return content
}
