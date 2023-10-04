import { useForm } from "react-hook-form"
import { Button } from "../../../components/shadcn/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/shadcn/ui/dialog"
import { Form } from "../../../components/shadcn/ui/form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import useAxios from "../../../app/api/axios"

export default function DeleteUserDialog(props: any) {
	const { isOpen, onClose, title, description, deleteUserId } = props

	const [roleField, setRoleField] = useState("")

	const api = useAxios()

	// get query client (react-query)
	const queryClient = useQueryClient()

	// GET USER QUERY (react-query)
	const getUserQuery = useQuery([`get-user`], async () => await api.get(`/users/${deleteUserId}`).then((res) => res.data), {
		onSuccess: (data) => {
			//console.log("query-changed:", data)
			userForm.setValue("id", data._id)
			userForm.setValue("username", data.username)
			userForm.setValue("role", data.role)
			setRoleField(data.role)
		},
		onError: () => {
			//console.log("Error: ", { res })
			//cl('error', "CREATE USER FAILED!")
			//makeToast(res.response.data.message, 'danger')
			userForm.setValue("id", "")
			userForm.setValue("username", "")
			userForm.setValue("role", "")
			setRoleField("")
		},
		onSettled: () => {
			//console.log("Settled: ", {res})
			//queryClient.invalidateQueries(["get-all-users"])
			//queryClient.invalidateQueries(["get-user"])
			//cancelModal()
		},
		refetchOnWindowFocus: false,
		enabled: deleteUserId !== null,
	})

	// UPDATE USER mutation (react-query)
	const deleteUserMutation = useMutation(async (id: string) => await api.delete(`/users/${id}`), {
		onSuccess: () => {
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
			queryClient.invalidateQueries(["get-all-users"])
			// queryClient.invalidateQueries(["get-user"])
			cancelModal()
		},
	})

	const userForm = useForm({ mode: "onChange" })

	const submitDeleteUserForm: any = (data: any) => {
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
		deleteUserMutation.mutate(id)
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
					<form onSubmit={userForm.handleSubmit(submitDeleteUserForm)}>
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</DialogHeader>
						<h4>Are you sure you want to delete {getUserQuery?.data?.username} ?</h4>
						<DialogFooter className="mt-8">
							<Button
								type="button"
								onClick={cancelModal}
							>
								Cancel
							</Button>
							<Button type="submit">Delete User</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
