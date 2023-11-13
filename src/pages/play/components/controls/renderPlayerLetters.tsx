import { useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs"
import { Button } from "../../../../components/shadcn/ui/button"

// [
// { id: 1, name: "A" },
// { id: 2, name: "G" },
// { id: 3, name: "T" },
// { id: 4, name: "Y" },
// { id: 5, name: "U" },
// { id: 6, name: "I" },
// { id: 7, name: "R" },
// { id: 8, name: "Z" },
// ]

interface ItemType {
	id: number
	name: string
}

export default function RenderPlayerLetters(props: any): JSX.Element {
	const { letters } = props

	const [sortedLetters, setSortedLetters] = useState<ItemType[]>([])

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
			setSortedLetters(transformedLetters)
		}
	}, [letters])

	const shuffleArray = (array: ItemType[]) => {
		const shuffledArray = [...array]
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
		}
		setSortedLetters(shuffledArray)
	}

	console.log("render")

	return (
		<div className="mb-4 p-4 bg-slate-800 rounded-md">
			<div className="flex justify-center items-center select-none bg-slate-700 rounded-md">
				<ReactSortable
					list={sortedLetters}
					setList={setSortedLetters}
					animation={150}
				>
					{sortedLetters.map((item) => (
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
						className="h-[60px] bg-orange-600 hover:bg-orange-700 active:bg-sky-600"
						onClick={() => shuffleArray(sortedLetters)}
					>
						SHUFFLE LETTERS
					</Button>
				</div>
			</div>
		</div>
	)
}
