import { useForm } from "react-hook-form"
import { Button } from "../../../components/shadcn/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/shadcn/ui/dialog"
import { Input } from "../../../components/shadcn/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/shadcn/ui/form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import IUser from "../../../models/interfaces/user"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/shadcn/ui/select"
import useAxios from "../../../app/api/axios"
import { useToasterContext } from "../../../app/context/toasterContext"

export default function CreateUserDialog(props: any) {
	const { isOpen, onClose, title, description } = props

	const userForm = useForm({ mode: "onChange" })

	const { showToast } = useToasterContext()

	const api = useAxios()

	const queryClient = useQueryClient()

	const createUserMutation = useMutation(async (user: IUser) => await api.post("/users", user), {
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
			cancelModal()
		},
	})

	const submitCreateUserForm: any = (data: any) => {
		const { username, password, role } = data
		createUserMutation.mutate({ username, password, role })
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
					<form onSubmit={userForm.handleSubmit(submitCreateUserForm)}>
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</DialogHeader>
						<FormField
							control={userForm.control}
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
							control={userForm.control}
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
							control={userForm.control}
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
