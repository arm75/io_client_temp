import LetterTileA from "../tokens/letterTiles/html/LetterTileA"
import LetterTileB from "../tokens/letterTiles/html/LetterTileB"
import LetterTileC from "../tokens/letterTiles/html/LetterTileC"
import LetterTileD from "../tokens/letterTiles/html/LetterTileD"
import LetterTileE from "../tokens/letterTiles/html/LetterTileE"
import LetterTileF from "../tokens/letterTiles/html/LetterTileF"
import LetterTileG from "../tokens/letterTiles/html/LetterTileG"
import LetterTileH from "../tokens/letterTiles/html/LetterTileH"
import LetterTileI from "../tokens/letterTiles/html/LetterTileI"
import LetterTileJ from "../tokens/letterTiles/html/LetterTileJ"
import LetterTileK from "../tokens/letterTiles/html/LetterTileK"
import LetterTileL from "../tokens/letterTiles/html/LetterTileL"
import LetterTileM from "../tokens/letterTiles/html/LetterTileM"
import LetterTileN from "../tokens/letterTiles/html/LetterTileN"
import LetterTileO from "../tokens/letterTiles/html/LetterTileO"
import LetterTileP from "../tokens/letterTiles/html/LetterTileP"
import LetterTileQ from "../tokens/letterTiles/html/LetterTileQ"
import LetterTileR from "../tokens/letterTiles/html/LetterTileR"
import LetterTileS from "../tokens/letterTiles/html/LetterTileS"
import LetterTileT from "../tokens/letterTiles/html/LetterTileT"
import LetterTileU from "../tokens/letterTiles/html/LetterTileU"
import LetterTileV from "../tokens/letterTiles/html/LetterTileV"
import LetterTileW from "../tokens/letterTiles/html/LetterTileW"
import LetterTileX from "../tokens/letterTiles/html/LetterTileX"
import LetterTileY from "../tokens/letterTiles/html/LetterTileY"
import LetterTileZ from "../tokens/letterTiles/html/LetterTileZ"

export default function DisplayMyLetters(props: any) {
	const { letters } = props

	let content: JSX.Element = <></>

	function letterTileToRender(letterTile: string): JSX.Element {
		let returnElement = <></>

		if (letterTile && typeof letterTile === "string") letterTile = letterTile.toUpperCase()

		switch (letterTile) {
			case "A":
				returnElement = <LetterTileA />
				break
			case "B":
				returnElement = <LetterTileB />
				break
			case "C":
				returnElement = <LetterTileC />
				break
			case "D":
				returnElement = <LetterTileD />
				break
			case "E":
				returnElement = <LetterTileE />
				break
			case "F":
				returnElement = <LetterTileF />
				break
			case "G":
				returnElement = <LetterTileG />
				break
			case "H":
				returnElement = <LetterTileH />
				break
			case "I":
				returnElement = <LetterTileI />
				break
			case "J":
				returnElement = <LetterTileJ />
				break
			case "K":
				returnElement = <LetterTileK />
				break
			case "L":
				returnElement = <LetterTileL />
				break
			case "M":
				returnElement = <LetterTileM />
				break
			case "N":
				returnElement = <LetterTileN />
				break
			case "O":
				returnElement = <LetterTileO />
				break
			case "P":
				returnElement = <LetterTileP />
				break
			case "Q":
				returnElement = <LetterTileQ />
				break
			case "R":
				returnElement = <LetterTileR />
				break
			case "S":
				returnElement = <LetterTileS />
				break
			case "T":
				returnElement = <LetterTileT />
				break
			case "U":
				returnElement = <LetterTileU />
				break
			case "V":
				returnElement = <LetterTileV />
				break
			case "W":
				returnElement = <LetterTileW />
				break
			case "X":
				returnElement = <LetterTileX />
				break
			case "Y":
				returnElement = <LetterTileY />
				break
			case "Z":
				returnElement = <LetterTileZ />
				break
			default:
				break
		}

		return returnElement
	}

	console.log(letters)

	if (letters) {
		content = (
			<div className="flex">
				{letters?.map((letter: string) => {
					return (
						<div
							className="border text-white bg-slate-300 hover:bg-emerald-300 hover:border-emerald-600 border-slate-800 flex justify-center items-center w-[46px] h-[46px]"
							//onMouseOver={() => handleMouseOver(cell.row, cell.col, cell.bonusCookieColor, cell.bonusCookie)}
						>
							<div className="select-none">{letterTileToRender(letter)}</div>
						</div>
					)
				})}
			</div>
		)
	} else {
		content = <></>
	}
	return content
}
