import RenderCell from "./renderCell"
import { useSetAtom } from "jotai"
import { hoverCoordinatesAtom, hoverCookieColorAtom, hoverCookieAtom } from "../../../pages/play/atoms/hoverAtoms"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function RenderBoard({ boardToRender }: any) {
	if (RENDER_LOG === "true") console.log("<RenderBoard> rendered...")

	const setHoverCoordinates = useSetAtom(hoverCoordinatesAtom)
	const setHoverCookieColor = useSetAtom(hoverCookieColorAtom)
	const setHoverCookie = useSetAtom(hoverCookieAtom)

	function handleMouseOut() {
		setHoverCoordinates({ row: 0, col: 0 })
		setHoverCookieColor("")
		setHoverCookie("")
	}

	return (
		<div className="col-span-10 overflow-auto flex justify-center bg-red-600 py-8">
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
