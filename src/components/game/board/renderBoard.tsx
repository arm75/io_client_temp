import RenderCell from "./renderCell"
import { useSetAtom } from "jotai"
import { hoverCoordinatesAtom, hoverCookieColorAtom, hoverCookieAtom } from "../../../pages/play/atoms/hoverAtoms"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function RenderBoard(props: any) {
	if (RENDER_LOG === "true") console.log("<RenderBoard> rendered...")
	const { gameId, boardToRender } = props

	let content: JSX.Element = <></>

	const setHoverCoordinates = useSetAtom(hoverCoordinatesAtom)
	const setHoverCookieColor = useSetAtom(hoverCookieColorAtom)
	const setHoverCookie = useSetAtom(hoverCookieAtom)

	function handleMouseOut() {
		setHoverCoordinates({ row: 0, col: 0 })
		setHoverCookieColor("")
		setHoverCookie("")
	}

	if (!boardToRender) {
		content = <div>Grid not loaded.</div>
	}

	if (boardToRender) {
		content = (
			<>
				<div className="col-span-10 overflow-auto flex justify-center bg-red-600 py-8">
					<div
						key={"main-board-box"}
						className="grid grid-cols-[repeat(18,_minmax(0,_1fr))] h-min border-4 border-slate-800"
						onMouseOut={handleMouseOut}
					>
						{boardToRender.map((row: any, rowIndex: any) => (
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
			</>
		)
	}
	return content
}
