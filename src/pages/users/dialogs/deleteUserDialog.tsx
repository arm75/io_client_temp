import { useForm } from "react-hook-form"
import { Button } from "../../../components/shadcn/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/shadcn/ui/dialog"
import { Form } from "../../../components/shadcn/ui/form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import useAxios from "../../../app/api/axios"
import { useToasterContext } from "../../../app/context/toasterContext"

export default function DeleteUserDialog(props: any) {
	const { isOpen, onClose, title, description, deleteUserId } = props

	const [roleField, setRoleField] = useState("")

	const userForm = useForm({ mode: "onChange" })

	const { showToast } = useToasterContext()

	const api = useAxios()

	const queryClient = useQueryClient()

	const getUserQuery = useQuery([`get-user`], async () => await api.get(`/users/${deleteUserId}`).then((res) => res.data), {
		onSuccess: (data) => {
			userForm.setValue("id", data._id)
			userForm.setValue("username", data.username)
			userForm.setValue("role", data.role)
			setRoleField(data.role)
		},
		onError: () => {
			userForm.setValue("id", "")
			userForm.setValue("username", "")
			userForm.setValue("role", "")
			setRoleField("")
		},
		refetchOnWindowFocus: false,
		enabled: !!deleteUserId,
	})

	const deleteUserMutation = useMutation(async (id: string) => await api.delete(`/users/${id}`), {
		onSuccess: (data) => {
			const message = data?.data?.message
			console.log(message)
			showToast("success", message)
		},
		onError: (error: any) => {
			const message = error?.response?.data?.message
			console.log(message)
			showToast("error", message)
		},
		onSettled: () => {
			queryClient.invalidateQueries(["get-all-users"])
			queryClient.invalidateQueries(["get-user"])
			cancelModal()
		},
	})

	const submitDeleteUserForm: any = (data: any) => {
		const { id, username, password, role } = data
		deleteUserMutation.mutate(id)
	}

	const cancelModal = () => {
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
