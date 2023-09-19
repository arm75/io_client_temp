import { useForm } from "react-hook-form"
import { Button } from "../../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import IUser from "../../../models/interfaces/user"
import axios from "axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

export default function UpdateUserDialog(props: any) {
	const { isOpen, onClose, title, description, updateUserId } = props

	// get query client (react-query)
	const queryClient = useQueryClient()

	// GET USER QUERY (react-query)
	const getUserQuery = useQuery(
		[`get-user-${updateUserId}`],
		async () => await axios.get(`http://127.0.0.1:3500/users/${updateUserId}`).then((res) => res.data),
		{
			enabled: Boolean(updateUserId),
		}
	)

	// UPDATE USER mutation (react-query)
	const updateUserMutation = useMutation(async (user: IUser) => await axios.patch("http://localhost:3500/users", user), {
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
			queryClient.invalidateQueries(["get-user-${updateUserId}"])
			cancelModal()
		},
	})

	const userForm = useForm({ mode: "onChange" })

	const submitUpdateUserForm: any = (data: any) => {
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
		updateUserMutation.mutate({ username, password, role })
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
							name="username"
							defaultValue={getUserQuery?.data?.username}
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
							defaultValue={getUserQuery?.data?.password}
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
							defaultValue={getUserQuery?.data?.role}
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
