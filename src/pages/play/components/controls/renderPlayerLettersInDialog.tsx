import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { sortedLettersInDialogAtom } from "../../atoms/sortedLettersInDialogAtom"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function RenderPlayerLettersInDialog({ letters }: any): JSX.Element {
	if (RENDER_LOG === "true") console.log("<RenderPlayerLetters> rendered...")

	const [virgin, setVirgin] = useState(true)

	const [sortedLetters, setSortedLetters] = useAtom(sortedLettersInDialogAtom)

	useEffect(() => {
		if (virgin && letters) {
			setSortedLetters(letters)
			setVirgin(false)
		}
	}, [virgin, letters, setSortedLetters])

	return (
		<div className="mb-4 p-2 bg-slate-800 rounded-md">
			<div className="flex justify-center items-center select-none bg-slate-900 rounded-md">
				{sortedLetters.map((item) => (
					<div
						className="inline-flex justify-center items-center w-[60px] h-[60px] m-2 border-4 text-5xl text-sky-600 hover:text-white bg-slate-300 hover:bg-sky-600 hover:border-white border-sky-900"
						key={item.id}
					>
						{item.name}
					</div>
				))}
			</div>
		</div>
	)
}
