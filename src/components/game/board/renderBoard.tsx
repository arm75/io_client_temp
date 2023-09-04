import React, { useEffect, useState } from "react"
// import TokenBlue1 from '../tokens/bonusCookies/blue/tokenBlue1';
// import TokenBlue10 from '../tokens/bonusCookies/blue/tokenBlue10';
// import TokenBlue3 from '../tokens/bonusCookies/blue/tokenBlue3';
// import TokenBlue5 from '../tokens/bonusCookies/blue/tokenBlue5';
// import TokenBlueArrows from '../tokens/bonusCookies/blue/tokenBlueArrows';
// import TokenBlueSpinner from '../tokens/bonusCookies/blue/tokenBlueSpinner';
// import TokenGold1 from '../tokens/bonusCookies/gold/tokenGold1';
// import TokenGold10 from '../tokens/bonusCookies/gold/tokenGold10';
// import TokenGold3 from '../tokens/bonusCookies/gold/tokenGold3';
// import TokenGold5 from '../tokens/bonusCookies/gold/tokenGold5';
// import TokenGoldArrows from '../tokens/bonusCookies/gold/tokenGoldArrows';
// import TokenGoldSpinner from '../tokens/bonusCookies/gold/tokenGoldSpinner';
// import TokenRed1 from '../tokens/bonusCookies/red/tokenRed1';
// import TokenRed10 from '../tokens/bonusCookies/red/tokenRed10';
// import TokenRed3 from '../tokens/bonusCookies/red/tokenRed3';
// import TokenRed5 from '../tokens/bonusCookies/red/tokenRed5';
// import TokenRedArrows from '../tokens/bonusCookies/red/tokenRedArrows';
// import TokenRedSpinner from '../tokens/bonusCookies/red/tokenRedSpinner';
import RandomToken from "../utils/randomToken"
import LetterTileA from "../tokens/letterTiles/html/LetterTileA"
import LetterTileB from "../tokens/letterTiles/html/LetterTileB"
import LetterTileC from "../tokens/letterTiles/html/LetterTileC"

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
	const [grid, setGrid] = useState<(Cell | null)[][]>(() => {
		// Initialize the grid here
		const numRows = 18
		const numCols = 18
		const initialGrid: (Cell | null)[][] = []

		for (let row = 0; row < numRows; row++) {
			const rowArray: (Cell | null)[] = []
			for (let col = 0; col < numCols; col++) {
				const cell: Cell = {
					booleanValue: false,
					stringValue: "X",
				}
				rowArray.push(cell)
			}
			initialGrid.push(rowArray)
		}
		setGridLoaded(true)
		return initialGrid
	})

	if (!gridLoaded) {
		content = <div>Grid not loaded.</div>
	}

	if (gridLoaded) {
		content = (
			<>
				<div className="col-span-10 overflow-auto flex justify-center bg-slate-500 py-8">
					<div className="grid grid-cols-[repeat(18,_minmax(0,_1fr))] h-min border-4 border-slate-800">
						{grid.map((row, rowIndex) => (
							<div
								key={rowIndex.toString()}
								className="bg-slate-500 col-span-1"
							>
								{row.map((cell, cellIndex) => {
									console.log({ cell })
									console.log(`cell (${rowIndex + 1}, ${cellIndex + 1})`)
									if (cellIndex % 2 == 0) {
										return (
											<div
												key={cellIndex.toString()}
												className="text-white bg-slate-300 border-2 border-slate-800 hover:border-yellow-500 flex justify-center items-center w-[46px] h-[46px]"
											>
												<RandomToken />
												{/* {cell?.stringValue} */}
											</div>
										)
									} else {
										return (
											<div
												key={cellIndex.toString()}
												className="text-white bg-slate-300 border-2 border-slate-800 hover:border-yellow-500 flex justify-center items-center w-[46px] h-[46px]"
											>
												{randomLetterTile()}
												{/* <LetterTileA /> */}
												{/* {cell?.stringValue} */}
											</div>
										)
									}
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
