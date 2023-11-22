import { chosenWordLengthAtom } from "../../atoms/chosenWordAtom"
import { hoverCoordinatesAtom, hoverCookieColorAtom, hoverCookieAtom } from "../../atoms/hoverAtoms"
import RenderCell from "./renderCell"
import { useAtomValue, useSetAtom } from "jotai"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function RenderBoard({ boardToRender }: any) {
	if (RENDER_LOG === "true") console.log("<RenderBoard> rendered...")

	const setHoverCoordinates = useSetAtom(hoverCoordinatesAtom)
	const setHoverCookieColor = useSetAtom(hoverCookieColorAtom)
	const setHoverCookie = useSetAtom(hoverCookieAtom)

	const numberOfLettersInWord = useAtomValue(chosenWordLengthAtom)
	console.log({ numberOfLettersInWord })

	function handleMouseOut() {
		setHoverCoordinates({ row: 0, col: 0 })
		setHoverCookieColor("")
		setHoverCookie("")
	}

	return (
		// < className="col-span-10 overflow-auto flex justify-center bg-emerald-700 py-8">
		<div className="col-span-10 overflow-auto flex justify-center bg-emerald-700 py-8">
			<div
				key={"main-board-box"}
				className="grid grid-cols-[repeat(18,_minmax(0,_1fr))] h-min border-4 border-slate-800"
				onMouseOut={handleMouseOut}
			>
				{boardToRender?.map((row: any, rowIndex: any) => (
					<div
						key={`row-${rowIndex.toString()}`}
						className="bg-slate-500 col-span-1"
					>
						{row.map((cell: any, cellIndex: any) => (
							<RenderCell
								key={`row-${rowIndex.toString()}|cell-${cellIndex.toString()}`}
								cell={cell}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	)
}
