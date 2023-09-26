import { useQueryClient } from "@tanstack/react-query"
import IUser from "../../../models/interfaces/user"
import DropDownMenuDemo from "../../../components/shadcn/dropDownMenu"
import axios, { AxiosResponse } from "axios"
import ChatBox from "../../../components/chat/chatBox"

export default function GameLayoutChat(props: any) {
	// const {children, pageTitle} = props

	const queryClient = useQueryClient()

	const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

	const logout = () => {
		axios.get("http://localhost:3000/auth/logout", { withCredentials: true }).then(
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
			<p className="text-white text-xl pb-2">Game Chat</p>
			<ChatBox />
		</>
	)
}
