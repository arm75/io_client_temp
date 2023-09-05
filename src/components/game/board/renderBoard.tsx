import { useState } from "react"
import LetterTileA from "../tokens/letterTiles/html/LetterTileA"
import LetterTileB from "../tokens/letterTiles/html/LetterTileB"
import LetterTileC from "../tokens/letterTiles/html/LetterTileC"
import RenderCell from "./renderCell"
import ICell from "../../../models/interfaces/game/board/cell"

// Define the dimensions of your grid
const numRows = 18
const numCols = 18

// Define a Cell type to represent each cell on the grid
type Cell = {
	booleanValue: boolean
	stringValue: string
}

export default function RenderBoard() {
	let content = <></>

	const [gridLoaded, setGridLoaded] = useState(false)

	function randomLetterTile(): JSX.Element {
		const letterTiles: { [key: number]: JSX.Element } = {
			1: <LetterTileA />,
			2: <LetterTileB />,
			3: <LetterTileC />,
		}

		const randomTile = Math.floor(Math.random() * 3) + 1

		let letterTileToRender = (<></>) as JSX.Element

		switch (randomTile) {
			case 1:
				letterTileToRender = letterTiles[1]
				break
			case 2:
				letterTileToRender = letterTiles[2]
				break
			case 3:
				letterTileToRender = letterTiles[3]
				break
		}

		return letterTileToRender
	}

	// Initialize the grid as a 2D array with default values
	const [board, setBoard] = useState<ICell[][]>(() => {
		// Initialize the grid here
		const numRows = 18
		const numCols = 18
		const initialBoard: ICell[][] = []

		for (let row = 0; row < numRows; row++) {
			const rowArray: ICell[] = []
			for (let col = 0; col < numCols; col++) {
				const thisCell: ICell = { row, col }
				rowArray.push(thisCell)
			}
			initialBoard.push(rowArray)
		}
		setGridLoaded(true)
		return initialBoard
	})

	if (!gridLoaded) {
		content = <div>Grid not loaded.</div>
	}

	if (gridLoaded) {
		content = (
			<>
				<div className="col-span-10 overflow-auto flex justify-center bg-slate-500 py-8">
					<div className="grid grid-cols-[repeat(18,_minmax(0,_1fr))] h-min border-4 border-slate-800">
						{board.map((row, rowIndex) => (
							<div
								key={rowIndex.toString()}
								className="bg-slate-500 col-span-1"
							>
								{row.map((cell, cellIndex) => {
									//console.log({ cell })
									//console.log(`cell (${rowIndex + 1}, ${cellIndex + 1})`)
									return (
										<div
											key={cellIndex.toString()}
											className="text-white bg-slate-300 border-2 border-slate-800 hover:border-yellow-500 flex justify-center items-center w-[46px] h-[46px]"
										>
											<RenderCell cell={cell} />
										</div>
									)
								})}
							</div>
						))}
					</div>
				</div>
			</>
		)
	}

	return content
}
