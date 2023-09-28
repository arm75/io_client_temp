import { useForm } from "react-hook-form"
import { Button } from "../../../components/shadcn/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/shadcn/dialog"
import { Input } from "../../../components/shadcn/input"
import { Form, FormControl, FormField, FormItem } from "../../../components/shadcn/form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import IUser from "../../../models/interfaces/user"
import axios from "axios"
import { useSocketContext } from "../../../app/context/socketContext"

export default function JoinGameDialog(props: any) {
	const { isOpen, onClose, title, description, joinGameId } = props

	//const [roleField, setRoleField] = useState("")
	const socket = useSocketContext()
	// get query client (react-query)
	const queryClient = useQueryClient()

	const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

	const userForm = useForm({ mode: "onChange" })

	// useEffect(() => {
	// 	userForm.setValue("userId", authMeQueryData?.id)
	// 	userForm.setValue("gameId", joinGameId)
	// }, [authMeQueryData?.id, joinGameId, userForm])

	// GET USER QUERY (react-query)
	// const joinGameQuery = useQuery(
	// 	[`get-user`],
	// 	async () => await axios.get(`http://127.0.0.1:3500/game/${joinGameId}`).then((res) => res.data),
	// 	{
	// 		onSuccess: (data) => {
	// 			userForm.setValue("id", data._id)
	// 			userForm.setValue("username", data.username)
	// 			userForm.setValue("role", data.role)
	// 			setRoleField(data.role)
	// 		},
	// 		onError: () => {
	// 			userForm.setValue("id", "")
	// 			userForm.setValue("username", "")
	// 			userForm.setValue("role", "")
	// 			setRoleField("")
	// 		},
	// 		onSettled: () => {
	// 			console.log("")
	// 		},
	// 		refetchOnWindowFocus: false,
	// 		enabled: joinGameId !== null,
	// 	}
	// )

	// UPDATE USER mutation (react-query)
	const joinGameMutation = useMutation(
		async (msg: { userId: string; gameId: string }) => await axios.patch("http://localhost:3500/game/join", msg),
		{
			onSuccess: (res) => {
				//console.log("Success: ", {res})
				//cl('info', "CREATE USER Successful!")
				//cancelModal()
				//makeToast(res.data.message, 'primary')
			},
			onError: (res) => {
				//console.log("Error: ", { res })
				//cl('error', "CREATE USER FAILED!")
				//makeToast(res.response.data.message, 'danger')
			},
			onSettled: () => {
				//console.log("Settled: ", {res})
				queryClient.invalidateQueries(["get-all-games"])
				socket.emit("joinGame")
				//queryClient.invalidateQueries(["get-user"])
				cancelModal()
			},
		}
	)

	const submitUpdateUserForm: any = (data: any) => {
		// { username, password, roles }: any
		//console.log("Form Submit Data: ", data)
		const { userId, gameId } = data
		console.log({ userId })
		console.log({ gameId })
		// console.log({ username })
		// console.log({ password })
		// console.log({ role })
		// console.log("submit function ran.")
		// const newUser = {
		// 	username: username,
		// 	password: password,
		// 	//firstname: firstname,
		// 	//lastname: lastname,
		// 	//email: email,
		// 	roles: roles,
		// 	//rolesArray: rolesArray,
		// }
		joinGameMutation.mutate({ userId, gameId })
	}

	const cancelModal = () => {
		//makeToast('Cancel World!', 'primary')
		userForm.reset()
		onClose()
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={cancelModal}
		>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...userForm}>
					<form onSubmit={userForm.handleSubmit(submitUpdateUserForm)}>
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</DialogHeader>
						<FormField
							control={userForm.control}
							name="userId"
							defaultValue={authMeQueryData?.id}
							render={({ field }) => {
								//console.log("id field:", field)
								return (
									<FormItem>
										{/* <FormLabel>Username</FormLabel> */}
										<FormControl>
											<Input
												type="hidden"
												// placeholder=""
												{...field}
											/>
										</FormControl>
										{/* <FormDescription>Please enter a username.</FormDescription>
										<FormMessage /> */}
									</FormItem>
								)
							}}
						/>
						<FormField
							control={userForm.control}
							name="gameId"
							defaultValue={joinGameId}
							render={({ field }) => {
								//console.log("id field:", field)
								return (
									<FormItem>
										{/* <FormLabel>Username</FormLabel> */}
										<FormControl>
											<Input
												type="hidden"
												// placeholder=""
												{...field}
											/>
										</FormControl>
										{/* <FormDescription>Please enter a username.</FormDescription>
										<FormMessage /> */}
									</FormItem>
								)
							}}
						/>
						UserId: {authMeQueryData?.id}
						<br />
						GameId: {joinGameId}
						<DialogFooter className="mt-8">
							<Button
								type="button"
								onClick={cancelModal}
							>
								Cancel
							</Button>
							<Button type="submit">Join Game</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
