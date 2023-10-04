import { useQueryClient } from "@tanstack/react-query"
import IUser from "../../../models/interfaces/user"
import { AxiosResponse } from "axios"
import useAxios from "../../api/axios"

export default function GameLayoutBoard(props: any) {
	const { children, pageTitle } = props

	const api = useAxios()

	const queryClient = useQueryClient()

	const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

	const logout = () => {
		api.get("/auth/logout", { withCredentials: true }).then(
			(res: AxiosResponse) => {
				if (res.data === "success") {
					window.location.href = "/"
				}
			},
			() => {
				console.log("Failure")
			}
		)
	}

	return <>{children}</>
}
