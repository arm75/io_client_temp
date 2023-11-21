import { Button } from "../../../components/shadcn/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/shadcn/ui/dialog"
import useToastContext from "../../../app/context/toast/useToastContext"
// import RenderBoard from "../../../components/game/board/renderBoard"
import { useAuthMe } from "../../../app/auth/useAuthMe"
import { useCurrentGame } from "../queries/useCurrentGame"
// import CustCursor from "../components/test/custCursor"
import BoxShadowExperiment from "../components/display/chosenWordToPlay"
import RenderPlayerLettersInDialog from "../components/controls/renderPlayerLettersInDialog"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { sortedLettersAtom } from "../atoms/sortedLettersAtom"
import { sortedLettersInDialogAtom } from "../atoms/sortedLettersInDialogAtom"
import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "../../../components/shadcn/ui/form"
import { Input } from "../../../components/shadcn/ui/input"
import { chosenWordAtom } from "../atoms/chosenWordAtom"
// import { useForm } from "react-hook-form"
// import { Input } from "../../../components/shadcn/ui/input"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/shadcn/ui/form"
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import IUser from "../../../models/interfaces/user"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/shadcn/ui/select"
// import { useState } from "react"
// import useAxios from "../../../app/api/axios"

export default function ChooseWordDialog({ isOpen, onClose, title, description }: any) {
	//const [roleField, setRoleField] = useState("")

	const chooseWordForm = useForm({ mode: "onChange" })
	const { showToast } = useToastContext()
	const authMeQueryData = useAuthMe()
	const currentGameQueryData = useCurrentGame(authMeQueryData.data?.currentGameId)

	const sortedLetters = useAtomValue(sortedLettersAtom)
	const setWordFragment = useSetAtom(chosenWordAtom)

	// console.log({ sortedLetters })
	// console.log("render")

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

	const submitChooseWordForm = (data: any) => {
		console.log(data)
		setWordFragment(data)
		onClose()
	}

	const cancelModal = () => {
		chooseWordForm.reset()
		onClose()
	}

	return (
		<>
			<Dialog
				open={isOpen}
				onOpenChange={cancelModal}
			>
				<DialogContent className="sm:max-w-[1000px] ">
					<Form {...chooseWordForm}>
						<form onSubmit={chooseWordForm.handleSubmit(submitChooseWordForm)}>
							<DialogHeader>
								<DialogTitle>{title}</DialogTitle>
								<DialogDescription>{description}</DialogDescription>
							</DialogHeader>

							<FormField
								control={chooseWordForm.control}
								name="word"
								defaultValue=""
								render={({ field }) => (
									<FormItem>
										<FormLabel>Word or Word Fragment</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormDescription>Please choose a word OR word fragment to play.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<RenderPlayerLettersInDialog letters={sortedLetters} />
							<DialogFooter className="mt-8">
								<Button
									type="button"
									onClick={cancelModal}
								>
									Cancel
								</Button>
								<Button type="submit">Choose</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
				{/* {isOpen ? <BoxShadowExperiment /> : <></>} */}
			</Dialog>
		</>
	)
}
