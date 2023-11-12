import { useForm } from "react-hook-form"
import { Button } from "../../../components/shadcn/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/shadcn/ui/dialog"
import { Input } from "../../../components/shadcn/ui/input"
import { Form, FormControl, FormField, FormItem } from "../../../components/shadcn/ui/form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import IUser from "../../../models/interfaces/user"
import useAxios from "../../../app/api/axios"
import { useAtomValue } from "jotai"
import { socketAtom } from "../../../app/atoms/socketAtom"

export default function JoinGameDialog({ isOpen, onClose, title, description, joinGameId }: any) {
	const api = useAxios()

	const socket = useAtomValue(socketAtom)

	const queryClient = useQueryClient()

	const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

	const userForm = useForm({ mode: "onChange" })

	const joinGameMutation = useMutation(async (msg: { userId: string; gameId: string }) => await api.patch("/game/join", msg), {
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
	})

	const submitUpdateUserForm = ({ userId, gameId }: any) => {
		console.log({ userId })
		console.log({ gameId })

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
