import HomeLayout from "../app/layouts/home/homeLayout"
import useAxios from "../app/api/axios"
import { useQuery } from "@tanstack/react-query"
import RenderBoard from "../components/game/board/renderBoard"

export default function HomePage() {
	let content: JSX.Element = <></>

	const api = useAxios("http://localhost:3500/")

	const getAllUsersQuery = useQuery(["get-all-users"], async () => await api.get("users").then((res) => res.data), {
		refetchOnWindowFocus: false,
	})

	if (getAllUsersQuery.isLoading || getAllUsersQuery.isFetching) {
		content = <p>Loading...</p>
	}

	if (getAllUsersQuery.isError) {
		content = <p className="errmsg">whatev</p>
	}

	if (getAllUsersQuery.isSuccess) {
		const usersData = []

		// transform data for table. needs to be extracted out to custom function...
		for (const objKey in getAllUsersQuery.data) {
			const obj: any = getAllUsersQuery.data[objKey]
			usersData.push({
				id: obj._id,
				username: obj.username,
				// password: obj.password,
				// roles: obj.roles.toString().replaceAll(',', ', '),
				// rolesArray: obj.roles
			})
		}

		content = (
			<>
				<HomeLayout pageTitle="Dashboard Page">
					<RenderBoard />
					{/* <TestBoard/>
					<DialogDemo/>
					<DemoTablePage></DemoTablePage> */}
				</HomeLayout>
			</>
		)
	}

	return content
}
