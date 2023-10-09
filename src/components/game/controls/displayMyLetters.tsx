import { useQueryClient } from "@tanstack/react-query"
import IUser from "../../../models/interfaces/user"
import { useEffect, useState } from "react"

export default function DisplayMyLetters() {
	const queryClient = useQueryClient()

	const [player, setPlayer] = useState<any>({})
	const [letters, setLetters] = useState<string[]>([])

	const gameInProgressQueryData: any = queryClient.getQueryData(["get-game-in-progress"])

	const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

	useEffect(() => {
		const thisPlayer = gameInProgressQueryData.players.find((player: any) => player.user._id === authMeQueryData?.id)
		console.log({ thisPlayer })
		setPlayer(thisPlayer)
	}, [gameInProgressQueryData.players, authMeQueryData?.id, player])

	useEffect(() => {
		if (player) {
			setLetters(player.letters)
		}
	}, [player])

	console.log({ player })
	console.log({ letters })
	console.log(letters?.length)

	return (
		<>
			{letters?.map((letter: string, count: number) => {
				if (count === letters?.length) {
					return `${letter}`
				} else {
					return `${letter}, `
				}
			})}
		</>
	)
}
