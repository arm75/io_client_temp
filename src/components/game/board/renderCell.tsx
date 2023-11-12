import { hoverCookieAtom, hoverCookieColorAtom, hoverCoordinatesAtom } from "../../../pages/play/atoms/hoverAtoms"
import TokenBlue1 from "../tokens/bonusCookies/blue/tokenBlue1"
import TokenBlue10 from "../tokens/bonusCookies/blue/tokenBlue10"
import TokenBlue3 from "../tokens/bonusCookies/blue/tokenBlue3"
import TokenBlue5 from "../tokens/bonusCookies/blue/tokenBlue5"
import TokenBlueArrow from "../tokens/bonusCookies/blue/tokenBlueArrow"
import TokenBlueSpinner from "../tokens/bonusCookies/blue/tokenBlueSpinner"
import TokenGold1 from "../tokens/bonusCookies/gold/tokenGold1"
import TokenGold10 from "../tokens/bonusCookies/gold/tokenGold10"
import TokenGold3 from "../tokens/bonusCookies/gold/tokenGold3"
import TokenGold5 from "../tokens/bonusCookies/gold/tokenGold5"
import TokenGoldArrow from "../tokens/bonusCookies/gold/tokenGoldArrow"
import TokenGoldSpinner from "../tokens/bonusCookies/gold/tokenGoldSpinner"
import TokenRed1 from "../tokens/bonusCookies/red/tokenRed1"
import TokenRed10 from "../tokens/bonusCookies/red/tokenRed10"
import TokenRed3 from "../tokens/bonusCookies/red/tokenRed3"
import TokenRed5 from "../tokens/bonusCookies/red/tokenRed5"
import TokenRedArrow from "../tokens/bonusCookies/red/tokenRedArrow"
import TokenRedSpinner from "../tokens/bonusCookies/red/tokenRedSpinner"
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
import { useSetAtom } from "jotai"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function RenderCell(props: any) {
	if (RENDER_LOG === "true") console.log("<RenderCell> rendered...")
	const { cell } = props

	const setHoverCoordinates = useSetAtom(hoverCoordinatesAtom)
	const setHoverCookieColor = useSetAtom(hoverCookieColorAtom)
	const setHoverCookie = useSetAtom(hoverCookieAtom)

	const handleMouseOver = (currentRow: number, currentCol: number, currentCookieColor: string, currentCookie: string) => {
		setHoverCoordinates({ row: currentRow, col: currentCol })
		setHoverCookieColor(currentCookieColor)
		setHoverCookie(currentCookie)
	}

	function bonusCookieToRender(color: string, cookie: string): JSX.Element {
		let returnElement = <></>

		switch (color) {
			case "gold":
				switch (cookie) {
					case "arrow":
						returnElement = <TokenGoldArrow />
						break
					case "spinner":
						returnElement = <TokenGoldSpinner />
						break
					case "ten":
						returnElement = <TokenGold10 />
						break
					case "five":
						returnElement = <TokenGold5 />
						break
					case "three":
						returnElement = <TokenGold3 />
						break
					case "one":
						returnElement = <TokenGold1 />
						break
					default:
						returnElement = <></>
				}
				break
			case "red":
				switch (cookie) {
					case "arrow":
						returnElement = <TokenRedArrow />
						break
					case "spinner":
						returnElement = <TokenRedSpinner />
						break
					case "ten":
						returnElement = <TokenRed10 />
						break
					case "five":
						returnElement = <TokenRed5 />
						break
					case "three":
						returnElement = <TokenRed3 />
						break
					case "one":
						returnElement = <TokenRed1 />
						break
					default:
						returnElement = <></>
				}
				break
			case "blue":
				switch (cookie) {
					case "arrow":
						returnElement = <TokenBlueArrow />
						break
					case "spinner":
						returnElement = <TokenBlueSpinner />
						break
					case "ten":
						returnElement = <TokenBlue10 />
						break
					case "five":
						returnElement = <TokenBlue5 />
						break
					case "three":
						returnElement = <TokenBlue3 />
						break
					case "one":
						returnElement = <TokenBlue1 />
						break
					default:
						returnElement = <></>
				}
				break
		}
		return returnElement
	}

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

	return (
		<>
			<div
				className="border text-white bg-slate-300 hover:bg-emerald-300 hover:border-emerald-600 border-slate-800 flex justify-center items-center w-[46px] h-[46px]"
				onMouseOver={() => handleMouseOver(cell.row, cell.col, cell.bonusCookieColor, cell.bonusCookie)}
			>
				<div className="select-none">
					{/* <div className=""> */}
					{cell?.letterTile ? letterTileToRender(cell?.letterTile) : bonusCookieToRender(cell.bonusCookieColor, cell.bonusCookie)}
				</div>
			</div>
		</>
	)
}
