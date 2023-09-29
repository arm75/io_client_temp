import { useForm } from "react-hook-form"
import { Button } from "../../../components/shadcn/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/shadcn/ui/dialog"
import { Input } from "../../../components/shadcn/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/shadcn/ui/form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import IGame from "../../../models/interfaces/game/board/game"
import IUser from "../../../models/interfaces/user"

export default function CreateGameDialog(props: any) {
	const { isOpen, onClose, title, description } = props

	// get query client (react-query)
	const queryClient = useQueryClient()

	const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

	// CREATE USER mutation (react-query)
	const createGameMutation = useMutation(async (game: IGame) => await axios.post("http://localhost:3500/game", game), {
		onSuccess: () => {
			//console.log("Success: ", {res})
			//cl('info', "CREATE USER Successful!")
			//cancelModal()
			//makeToast(res.data.message, 'primary')
		},
		onError: (res) => {
			console.log("Error: ", { res })
			//cl('error', "CREATE USER FAILED!")
			//makeToast(res.response.data.message, 'danger')
		},
		onSettled: () => {
			//console.log("Settled: ", {res})
			queryClient.invalidateQueries(["get-all-games"])
			cancelModal()
		},
	})

	const createGameForm = useForm({ mode: "onChange" })

	const submitCreateGameForm: any = (data: any) => {
		// { username, password, roles }: any
		const { name, description } = data
		console.log({ name })
		console.log({ description })

		if (!authMeQueryData) return

		const creator: IUser = {
			id: authMeQueryData.id,
			username: authMeQueryData.username,
			role: authMeQueryData.role,
		}

		createGameMutation.mutate({ name, description, creator })

		// const newUser = {
		// 	username: username,
		// 	password: password,
		// 	//firstname: firstname,
		// 	//lastname: lastname,
		// 	//email: email,
		// 	roles: roles,
		// 	//rolesArray: rolesArray,
		// }
	}

	const cancelModal = () => {
		//makeToast('Cancel World!', 'primary')
		createGameForm.reset()
		onClose()
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={cancelModal}
		>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...createGameForm}>
					<form onSubmit={createGameForm.handleSubmit(submitCreateGameForm)}>
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</DialogHeader>
						<FormField
							control={createGameForm.control}
							name="name"
							defaultValue=""
							render={({ field }) => {
								//console.log({ field })
								return (
									<FormItem>
										<FormLabel>Game Name</FormLabel>
										<FormControl>
											<Input
												// placeholder=""
												{...field}
											/>
										</FormControl>
										<FormDescription>Please enter a game name.</FormDescription>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<FormField
							control={createGameForm.control}
							name="description"
							defaultValue=""
							render={({ field }) => {
								//console.log({ field })
								return (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input
												// placeholder=""
												{...field}
											/>
										</FormControl>
										<FormDescription>Please enter a game description.</FormDescription>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						{/* <FormField
							control={createGameForm.control}
							name="role"
							defaultValue=""
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="w-[180px]">
													<SelectValue placeholder="" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Player">Player</SelectItem>
													<SelectItem value="Admin">Admin</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormDescription>Please select a role.</FormDescription>
										<FormMessage />
									</FormItem>
								)
							}}
						/> */}
						<DialogFooter className="mt-8">
							<Button
								type="button"
								onClick={cancelModal}
							>
								Cancel
							</Button>
							<Button type="submit">Create Game</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
