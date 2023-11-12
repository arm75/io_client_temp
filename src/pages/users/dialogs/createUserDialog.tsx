import { useForm } from "react-hook-form"
import { Button } from "../../../components/shadcn/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/shadcn/ui/dialog"
import { Input } from "../../../components/shadcn/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/shadcn/ui/form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import IUser from "../../../models/interfaces/user"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/shadcn/ui/select"
import useAxios from "../../../app/api/axios"
import useToastContext from "../../../app/context/toast/useToastContext"

export default function CreateUserDialog({ isOpen, onClose, title, description }: any) {
	const createUserForm = useForm({ mode: "onChange" })

	const { showToast } = useToastContext()

	const api = useAxios()

	const queryClient = useQueryClient()

	const createUserMutation = useMutation(async (user: IUser) => await api.post("/users", user), {
		onSuccess: (data: any) => {
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
			cancelModal()
		},
	})

	const submitCreateUserForm: any = ({ username, password, role }: any) => {
		createUserMutation.mutate({ username, password, role })
	}

	const cancelModal = () => {
		createUserForm.reset()
		onClose()
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={cancelModal}
		>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...createUserForm}>
					<form onSubmit={createUserForm.handleSubmit(submitCreateUserForm)}>
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</DialogHeader>
						<FormField
							control={createUserForm.control}
							name="username"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>Please enter a username.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={createUserForm.control}
							name="password"
							defaultValue=""
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>Please enter a password.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={createUserForm.control}
							name="role"
							defaultValue=""
							render={({ field }) => (
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
							)}
						/>
						<DialogFooter className="mt-8">
							<Button
								type="button"
								onClick={cancelModal}
							>
								Cancel
							</Button>
							<Button type="submit">Create User</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
