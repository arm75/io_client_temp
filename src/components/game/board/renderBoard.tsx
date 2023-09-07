import { useEffect, useState } from "react"
import RenderCell from "./renderCell"
import ICell from "../../../models/interfaces/game/board/cell"
import createNewBoard from "../utils/createNewBoard"
import { useGameContext } from "../contexts/gameContext"

// Define the dimensions of your grid
// const numRows = 18
// const numCols = 18

export default function RenderBoard() {
	let content = <></>

	const [boardLoaded, setBoardLoaded] = useState(false)
	const [board, setBoard] = useState<ICell[][]>([])

	const { setHoverCoordinates } = useGameContext()

	useEffect(() => {
		console.log("Initializing board (useEffect)...")
		if (!boardLoaded) {
			const gameBoard = createNewBoard()
			console.log({ gameBoard })
			setBoard(gameBoard)
			setBoardLoaded(true)
		}
		console.log("Board Initialization complete.")
	}, [boardLoaded])

	// function randomLetterTile(): JSX.Element {
	// 	const letterTiles: { [key: number]: JSX.Element } = {
	// 		1: <LetterTileA />,
	// 		2: <LetterTileB />,
	// 		3: <LetterTileC />,
	// 	}

	// 	const randomTile = Math.floor(Math.random() * 3) + 1

	// 	let letterTileToRender = (<></>) as JSX.Element

	// 	switch (randomTile) {
	// 		case 1:
	// 			letterTileToRender = letterTiles[1]
	// 			break
	// 		case 2:
	// 			letterTileToRender = letterTiles[2]
	// 			break
	// 		case 3:
	// 			letterTileToRender = letterTiles[3]
	// 			break
	// 	}

	// 	return letterTileToRender
	// }

	// Initialize the grid as a 2D array with default values
	// const [board, setBoard] = useState<ICell[][]>(() => {
	// 	// Initialize the grid here
	// 	const numRows = 18
	// 	const numCols = 18
	// 	const initialBoard: ICell[][] = []

	// 	for (let row = 0; row < numRows; row++) {
	// 		const rowArray: ICell[] = []
	// 		for (let col = 0; col < numCols; col++) {
	// 			const thisCell: ICell = { row, col }
	// 			rowArray.push(thisCell)
	// 		}
	// 		initialBoard.push(rowArray)
	// 	}
	// 	setGridLoaded(true)
	// 	return initialBoard
	// })

	function handleMouseOut() {
		//console.log("handleMouseOver\n")
		//console.log("row: ", currentRow, ", col:", currentCol, "\n")
		setHoverCoordinates({ row: 0, col: 0 })
	}

	function consoleLog(msg: string) {
		console.log(msg)
		return <></>
	}

	if (!boardLoaded) {
		content = <div>Grid not loaded.</div>
	}

	if (boardLoaded) {
		content = (
			<>
				<div className="col-span-10 overflow-auto flex justify-center bg-slate-500 py-8">
					<div
						className="grid grid-cols-[repeat(18,_minmax(0,_1fr))] h-min border-4 border-slate-800"
						onMouseOut={handleMouseOut}
					>
						{board.map((row, rowIndex) => (
							<div
								key={`row-${rowIndex.toString()}`}
								className="bg-slate-500 col-span-1"
							>
								{/* {consoleLog(`row-${rowIndex.toString()}`)} */}
								{row.map((cell, cellIndex) => {
									//console.log(`row-${rowIndex.toString()}`)
									//console.log(`row-${rowIndex.toString()}|cell-${cellIndex.toString()}`)
									//console.log(`cell (${rowIndex + 1}, ${cellIndex + 1})`)
									return (
										// <div
										// 	key={cellIndex.toString()}
										// 	// className="text-slate-700 bg-slate-300 hover:bg-yellow-300 flex justify-center items-center w-[46px] h-[46px]"
										// 	className="border text-white bg-slate-300 border-slate-800 flex justify-center items-center w-[46px] h-[46px]"
										// >
										<RenderCell // onMouseOver={setHoverPosition(cell.row, cell.col)}
											key={`row-${rowIndex.toString()}|cell-${cellIndex.toString()}`}
											cell={cell}
										/>
										// </div>
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
