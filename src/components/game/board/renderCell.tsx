import ICell from "../../../models/interfaces/game/board/cell"
import { useGameContext } from "../contexts/gameContext"
import RandomToken from "../utils/randomToken"

export default function RenderCell(props: any) {
	const { cell } = props
	const { setHoverCoordinates, setHoverCookieColor, setHoverCookie } = useGameContext()

	const handleMouseOver = (currentRow: number, currentCol: number, currentCookieColor: string, currentCookie: string) => {
		//console.log("handleMouseOver\n")
		//console.log("row: ", currentRow, ", col:", currentCol, "\n")
		setHoverCoordinates({ row: currentRow, col: currentCol })
		setHoverCookieColor(currentCookieColor)
		setHoverCookie(currentCookie)
	}

	//console.log(cell)
	// className="text-slate-700 bg-slate-300 hover:bg-yellow-300 flex justify-center items-center w-[46px] h-[46px]"

	return (
		<>
			<div
				className="border text-white bg-slate-300 hover:bg-emerald-300 hover:border-emerald-600 border-slate-800 flex justify-center items-center w-[46px] h-[46px]"
				onMouseOver={() => handleMouseOver(cell.row, cell.col, cell.bonusCookieColor, cell.bonusCookie)}
			>
				<div className="select-none">
					{/* {cell.row}, {cell.col}
                    {cell.bonusCookieColor} */}
					{cell.bonusCookieToken}
				</div>
			</div>
		</>
	)

	//return <RandomToken />
}
