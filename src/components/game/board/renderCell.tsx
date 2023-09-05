import ICell from "../../../models/interfaces/game/board/cell"
import RandomToken from "../utils/randomToken"

export default function RenderCell(cell: ICell) {
	//const {cell} = props

	console.log(cell)

	return (
		<>
			<div>
				{cell.row}, {cell.col}
			</div>
		</>
	)

	//return <RandomToken />
}
