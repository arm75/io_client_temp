import { useForm } from "react-hook-form"
import { Button } from "../../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import IUser from "../../../models/interfaces/user"
import axios from "axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

export default function CreateUserDialog(props: any) {
	const { isOpen, onClose, title, description } = props

	// get query client (react-query)
	const queryClient = useQueryClient()

	// CREATE USER mutation (react-query)
	const createUserMutation = useMutation(async (user: IUser) => await axios.post("http://localhost:3500/users", user), {
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
			queryClient.invalidateQueries(["get-all-users"])
			cancelModal()
		},
	})

	const userForm = useForm({ mode: "onChange" })

	const submitCreateUserForm: any = (data: any) => {
		// { username, password, roles }: any
		const { username, password, role } = data
		console.log({ username })
		console.log({ password })
		console.log({ role })
		console.log("submit function ran.")
		// const newUser = {
		// 	username: username,
		// 	password: password,
		// 	//firstname: firstname,
		// 	//lastname: lastname,
		// 	//email: email,
		// 	roles: roles,
		// 	//rolesArray: rolesArray,
		// }
		createUserMutation.mutate({ username, password, role })
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
					<form onSubmit={userForm.handleSubmit(submitCreateUserForm)}>
						<DialogHeader>
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</DialogHeader>
						<FormField
							control={userForm.control}
							name="username"
							defaultValue=""
							render={({ field }) => {
								console.log({ field })
								return (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input
												// placeholder=""
												{...field}
											/>
										</FormControl>
										<FormDescription>Please enter a username.</FormDescription>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<FormField
							control={userForm.control}
							name="password"
							defaultValue=""
							render={({ field }) => {
								console.log({ field })
								return (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												// placeholder=""
												{...field}
											/>
										</FormControl>
										<FormDescription>Please enter a password.</FormDescription>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<FormField
							control={userForm.control}
							name="role"
							defaultValue=""
							render={({ field }) => {
								console.log({ field })
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
													<SelectItem value="Employee">Player</SelectItem>
													<SelectItem value="Admin">Admin</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormDescription>Please select a role.</FormDescription>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<DialogFooter>
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
