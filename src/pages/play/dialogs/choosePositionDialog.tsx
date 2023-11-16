import { Button } from "../../../components/shadcn/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/shadcn/ui/dialog"
import useToastContext from "../../../app/context/toast/useToastContext"
import { useAuthMe } from "../../../app/auth/useAuthMe"
import { useCurrentGame } from "../queries/useCurrentGame"
import BoxShadowExperiment from "../playPageTest2"
import RenderBoard from "../components/display/renderBoard"
// import { useForm } from "react-hook-form"
// import { Input } from "../../../components/shadcn/ui/input"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/shadcn/ui/form"
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import IUser from "../../../models/interfaces/user"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/shadcn/ui/select"
// import { useState } from "react"
// import useAxios from "../../../app/api/axios"

export default function ChoosePositionDialog({ isOpen, onClose, title, description }: any) {
	//const [roleField, setRoleField] = useState("")

	//const userForm = useForm({ mode: "onChange" })

	const { showToast } = useToastContext()

	const authMeQueryData = useAuthMe()

	const currentGameQueryData = useCurrentGame(authMeQueryData.data?.currentGameId)

	//const api = useAxios()

	//const queryClient = useQueryClient()

	// const getUserQuery = useQuery([`get-user`], async () => await api.get(`/users/${updateUserId}`).then((res) => res.data), {
	// 	onSuccess: (data) => {
	// 		userForm.setValue("id", data._id)
	// 		userForm.setValue("username", data.username)
	// 		userForm.setValue("role", data.role)
	// 		setRoleField(data.role)
	// 	},
	// 	onError: () => {
	// 		userForm.setValue("id", "")
	// 		userForm.setValue("username", "")
	// 		userForm.setValue("role", "")
	// 		setRoleField("")
	// 	},
	// 	refetchOnWindowFocus: false,
	// 	enabled: Boolean(updateUserId),
	// })

	// const updateUserMutation = useMutation(async (user: IUser) => await api.patch("/users", user), {
	// 	onSuccess: (data) => {
	// 		const message = data?.data?.message
	// 		console.log(message)
	// 		showToast("success", message)
	// 	},
	// 	onError: (error: any) => {
	// 		const message = error?.response?.data?.message
	// 		console.log(message)
	// 		showToast("error", message)
	// 	},
	// 	onSettled: () => {
	// 		queryClient.invalidateQueries(["get-all-users"])
	// 		queryClient.invalidateQueries(["get-user"])
	// 		cancelModal()
	// 	},
	// })

	// const submitUpdateUserForm: any = (data: any) => {
	// 	const { id, username, password, role } = data
	// 	updateUserMutation.mutate({ id, username, password, role })
	// }

	const cancelModal = () => {
		//userForm.reset()
		onClose()
	}

	return (
		<>
			<Dialog
				open={isOpen}
				onOpenChange={cancelModal}
			>
				{/* <DialogContent className="sm:max-w-[1000px]"> */}
				<DialogContent className="sm:max-w-[1425px] sm:h-[100vh]">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>
					{authMeQueryData?.data?.currentGameId && currentGameQueryData?.data?.board ? (
						<RenderBoard
							gameId={authMeQueryData?.data?.currentGameId}
							boardToRender={currentGameQueryData?.data?.board}
						/>
					) : (
						<>
							<h1>NO GAME IN PROGRESS</h1>
						</>
					)}
					<DialogFooter className="mt-8">
						<Button
							type="button"
							onClick={cancelModal}
						>
							Cancel
						</Button>
						<Button type="submit">Button</Button>
					</DialogFooter>
				</DialogContent>
				{isOpen ? <BoxShadowExperiment /> : <></>}
			</Dialog>
		</>
	)
}
