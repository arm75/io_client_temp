import { useQueryClient } from "@tanstack/react-query"
import IUser from "../../../models/interfaces/user"
import axios, { AxiosResponse } from "axios"

export default function GameLayoutContent(props: any) {
	const { children, pageTitle } = props

	const queryClient = useQueryClient()

	const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

	const logout = () => {
		axios.get("http://localhost:3500/auth/logout", { withCredentials: true }).then(
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

	return (
		<>
			{/* <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>                     */}
			{children}
		</>
	)
}
