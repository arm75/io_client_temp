import ICell from "../../../models/interfaces/game/board/cell"
import { useBoardHoverContext } from "../contexts/boardHoverContext"
import RandomToken from "../utils/randomToken"
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

export default function RenderCell(props: any) {
	const { cell } = props
	const { setHoverCoordinates, setHoverCookieColor, setHoverCookie } = useBoardHoverContext()

	const handleMouseOver = (currentRow: number, currentCol: number, currentCookieColor: string, currentCookie: string) => {
		//console.log("handleMouseOver\n")
		//console.log("row: ", currentRow, ", col:", currentCol, "\n")
		setHoverCoordinates({ row: currentRow, col: currentCol })
		setHoverCookieColor(currentCookieColor)
		setHoverCookie(currentCookie)
	}

	function elementToRender(color: string, cookie: string): JSX.Element {
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

	//console.log(cell)
	// className="text-slate-700 bg-slate-300 hover:bg-yellow-300 flex justify-center items-center w-[46px] h-[46px]"

	return (
		<>
			<div
				className="border text-white bg-slate-300 hover:bg-emerald-300 hover:border-emerald-600 border-slate-800 flex justify-center items-center w-[46px] h-[46px]"
				onMouseOver={() => handleMouseOver(cell.row, cell.col, cell.bonusCookieColor, cell.bonusCookie)}
			>
				<div className="select-none">
					{/* {cell.row}, {cell.col} */}
					{/* {cell.color}, {cell.cookie} */}
					{/* {cell.bonusCookieColor} */}
					{elementToRender(cell.bonusCookieColor, cell.bonusCookie)}
				</div>
			</div>
		</>
	)

	//return <RandomToken />
}
