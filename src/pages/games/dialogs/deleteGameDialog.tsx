import { useForm } from "react-hook-form"
import { Button } from "../../../components/shadcn/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/shadcn/ui/dialog"
import { Form } from "../../../components/shadcn/ui/form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useAxios from "../../../app/api/axios"

export default function DeleteGameDialog(props: any) {
	const { isOpen, onClose, title, description, deleteGameId } = props

	const gameForm = useForm({ mode: "onChange" })

	const api = useAxios()

	const queryClient = useQueryClient()

	const getGameQuery = useQuery([`get-game-delete-game`], async () => await api.get(`/game/${deleteGameId}`).then((res) => res.data), {
		onSuccess: (data) => {
			//console.log("query-changed:", data)
			gameForm.setValue("id", data._id)
			gameForm.setValue("name", data.name)
			//userForm.setValue("role", data.role)
			//setRoleField(data.role)
		},
		onError: () => {
			//console.log("Error: ", { res })
			//cl('error', "CREATE USER FAILED!")
			//makeToast(res.response.data.message, 'danger')
			gameForm.setValue("id", "")
			gameForm.setValue("name", "")
			//userForm.setValue("username", "")
			//userForm.setValue("role", "")
			//setRoleField("")
		},
		onSettled: () => {
			//console.log("Settled: ", {res})
			//queryClient.invalidateQueries(["get-all-users"])
			//queryClient.invalidateQueries(["get-user"])
			//cancelModal()
		},
		refetchOnWindowFocus: false,
		enabled: deleteGameId !== null,
	})

	const deleteGameMutation = useMutation(async (id: string) => await api.delete(`/game/${id}`), {
		onSuccess: () => {
			//console.log("Success: ", {res})
			//cl('info', "CREATE USER Successful!")
			//cancelModal()
			//makeToast(res.data.message, 'primary')
			onClose()
		},
		onError: (res) => {
			//console.log("Error: ", { res })
			//cl('error', "CREATE USER FAILED!")
			//makeToast(res.response.data.message, 'danger')
		},
		onSettled: () => {
			//console.log("Settled: ", {res})
			queryClient.invalidateQueries(["get-all-games"])
			//queryClient.invalidateQueries(["get-game"])
			cancelModal()
		},
	})

	const submitDeleteGameForm: any = (data: any) => {
		// { username, password, roles }: any
		//console.log("Form Submit Data: ", data)
		const { id, username, password, role } = data
		//console.log({ id })
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
		deleteGameMutation.mutate(id)
	}

	const cancelModal = () => {
		//makeToast('Cancel World!', 'primary')
		gameForm.reset()
		onClose()
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={cancelModal}
		>
			<DialogContent className="sm:max-w-[425px]">
				<p>Value: {deleteGameId !== null ? "true" : "false"}</p>
				<Form {...gameForm}>
					<form onSubmit={gameForm.handleSubmit(submitDeleteGameForm)}>
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</DialogHeader>
						<h4>Are you sure you want to delete game {getGameQuery?.data?.name} ?</h4>
						<DialogFooter className="mt-8">
							<Button
								type="button"
								onClick={cancelModal}
							>
								Cancel
							</Button>
							<Button type="submit">Delete Game</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
