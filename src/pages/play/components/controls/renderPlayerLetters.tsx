import React, { FC, useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs"
import { useCurrentGame } from "../../queries/useCurrentGame"
import { useAuthMe } from "../../../../app/auth/useAuthMe"
import { Button } from "../../../../components/shadcn/ui/button"

interface ItemType {
	id: number
	name: string
}

export default function RenderPlayerLetters(props: any): JSX.Element {
	const { letters } = props

	const authMeQueryData = useAuthMe()

	//const currentGameQueryData = useCurrentGame(authMeQueryData?.data?.currentGameId)

	const [state, setState] = useState<ItemType[]>([])

	// const [state, setState] = useState<ItemType[]>([
	// 	{ id: 1, name: "A" },
	// 	{ id: 2, name: "G" },
	// 	{ id: 3, name: "T" },
	// 	{ id: 4, name: "Y" },
	// 	{ id: 5, name: "U" },
	// 	{ id: 6, name: "I" },
	// 	{ id: 7, name: "R" },
	// 	{ id: 8, name: "Z" },
	// ])

	useEffect(() => {
		function transformLetters(letters: [string]) {
			const sortableLetters: any = []
			letters.forEach((letter: string, count: number) => {
				sortableLetters.push({ id: count, name: letter })
			})
			return sortableLetters
		}

		if (letters) {
			const transformedLetters = transformLetters(letters)
			setState(transformedLetters)
		}
	}, [letters])

	console.log()

	return (
		<div className="flex justify-center items-center select-none">
			<ReactSortable
				list={state}
				setList={setState}
				animation={150}
			>
				{state.map((item) => (
					<div
						className="inline-flex justify-center items-center w-[60px] h-[60px] m-2 border-4 text-5xl text-sky-600 hover:text-white bg-slate-300 hover:bg-sky-600 hover:border-white border-sky-900"
						key={item.id}
					>
						{item.name}
					</div>
				))}
			</ReactSortable>
			<div className="px-6">
				<Button
					size={"lg"}
					className="h-[60px] bg-orange-600"
				>
					SHUFFLE LETTERS
				</Button>
			</div>
		</div>
	)
}
