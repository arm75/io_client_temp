import { columns } from "./columns"
import { DataTable } from "./dataTable"
import { useQuery } from "@tanstack/react-query"
import useAxios from "../../../../app/api/axios"

export default function GamesTable(props: any) {
	const { joinGameFn, updateGameFn, cancelGameFn, deleteGameFn } = props

	let content: JSX.Element = <></>

	const api = useAxios("http://localhost:3500/")

	const getAllGamesQuery = useQuery(
		["get-all-games"],
		async () =>
			await api.get("game").then((res: any) => {
				//console.log(res.data)
				return res.data
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const onJoinGameClick = (id: any) => {
		joinGameFn(id)
	}

	const onUpdateGameClick = (id: any) => {
		updateGameFn(id)
	}

	const onCancelGameClick = (id: any) => {
		cancelGameFn(id)
	}

	const onDeleteGameClick = (id: any) => {
		deleteGameFn(id)
	}

	if (getAllGamesQuery.isLoading || getAllGamesQuery.isFetching) {
		content = <p>Loading...</p>
	}

	if (getAllGamesQuery.isError) {
		content = <p className="errmsg">whatev</p>
	}

	if (getAllGamesQuery.isSuccess) {
		const data = getAllGamesQuery.data
		content = (
			<DataTable
				columns={columns}
				data={data}
				joinGameFn={onJoinGameClick}
				updateGameFn={onUpdateGameClick}
				cancelGameFn={onCancelGameClick}
				deleteGameFn={onDeleteGameClick}
			/>
		)
	}

	return content
}
