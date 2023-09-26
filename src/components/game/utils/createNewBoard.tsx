import ICell from "../../../models/interfaces/game/board/cell"
import shuffleTokens from "./shuffleTokens"
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
import IGameBoard from "../../../models/interfaces/game/board/game"

export default function createNewBoard() {
	// initial constants
	const numRows = 18
	const numCols = 18
	const bonusCookieRate = 0.3
	const totalCells = numRows * numCols

	// calc total cookies
	const totalBonusCookies = Math.round(totalCells * bonusCookieRate)
	const totalEmptyCells = totalCells - totalBonusCookies
	// console.log({ totalCells })
	// console.log({ totalEmptyCells })
	// console.log({ totalBonusCookies })

	// calc total of each color
	let cookiesRemaining = totalBonusCookies
	const totalRedBonusCookies = Math.round(totalBonusCookies * 0.3)
	cookiesRemaining = cookiesRemaining - totalRedBonusCookies
	const totalBlueBonusCookies = Math.round(totalBonusCookies * 0.3)
	cookiesRemaining = cookiesRemaining - totalBlueBonusCookies
	const totalGoldBonusCookies = cookiesRemaining
	// console.log({ totalGoldBonusCookies })
	// console.log({ totalRedBonusCookies })
	// console.log({ totalBlueBonusCookies })

	// calc number of each type of gold cookies
	let goldCookiesRemaining = totalGoldBonusCookies
	const goldArrowCookies = Math.round(totalGoldBonusCookies * 0.2)
	goldCookiesRemaining = goldCookiesRemaining - goldArrowCookies
	const goldSpinnerCookies = Math.round(totalGoldBonusCookies * 0.2)
	goldCookiesRemaining = goldCookiesRemaining - goldSpinnerCookies
	const goldNumberCookies = goldCookiesRemaining
	let goldNumberCookiesRemaining = goldNumberCookies
	const goldTenCookies = Math.round(goldNumberCookies * 0.25)
	goldNumberCookiesRemaining = goldNumberCookiesRemaining - goldTenCookies
	const goldFiveCookies = Math.round(goldNumberCookies * 0.25)
	goldNumberCookiesRemaining = goldNumberCookiesRemaining - goldFiveCookies
	const goldThreeCookies = Math.round(goldNumberCookies * 0.25)
	goldNumberCookiesRemaining = goldNumberCookiesRemaining - goldThreeCookies
	const goldOneCookies = goldNumberCookiesRemaining
	// console.log({ goldArrowCookies })
	// console.log({ goldSpinnerCookies })
	// console.log({ goldNumberCookies })
	// console.log({ goldTenCookies })
	// console.log({ goldFiveCookies })
	// console.log({ goldThreeCookies })
	// console.log({ goldOneCookies })

	// calc number of each type of red cookies
	let redCookiesRemaining = totalRedBonusCookies
	const redArrowCookies = Math.round(totalRedBonusCookies * 0.2)
	redCookiesRemaining = redCookiesRemaining - redArrowCookies
	const redSpinnerCookies = Math.round(totalRedBonusCookies * 0.2)
	redCookiesRemaining = redCookiesRemaining - redSpinnerCookies
	const redNumberCookies = redCookiesRemaining
	let redNumberCookiesRemaining = redNumberCookies
	const redTenCookies = Math.round(redNumberCookies * 0.25)
	redNumberCookiesRemaining = redNumberCookiesRemaining - redTenCookies
	const redFiveCookies = Math.round(redNumberCookies * 0.25)
	redNumberCookiesRemaining = redNumberCookiesRemaining - redFiveCookies
	const redThreeCookies = Math.round(redNumberCookies * 0.25)
	redNumberCookiesRemaining = redNumberCookiesRemaining - redThreeCookies
	const redOneCookies = redNumberCookiesRemaining
	// console.log({ redArrowCookies })
	// console.log({ redSpinnerCookies })
	// console.log({ redNumberCookies })
	// console.log({ redTenCookies })
	// console.log({ redFiveCookies })
	// console.log({ redThreeCookies })
	// console.log({ redOneCookies })

	// calc number of each type of blue cookies
	let blueCookiesRemaining = totalBlueBonusCookies
	const blueArrowCookies = Math.round(totalBlueBonusCookies * 0.2)
	blueCookiesRemaining = blueCookiesRemaining - blueArrowCookies
	const blueSpinnerCookies = Math.round(totalBlueBonusCookies * 0.2)
	blueCookiesRemaining = blueCookiesRemaining - blueSpinnerCookies
	const blueNumberCookies = blueCookiesRemaining
	let blueNumberCookiesRemaining = blueNumberCookies
	const blueTenCookies = Math.round(blueNumberCookies * 0.25)
	blueNumberCookiesRemaining = blueNumberCookiesRemaining - blueTenCookies
	const blueFiveCookies = Math.round(blueNumberCookies * 0.25)
	blueNumberCookiesRemaining = blueNumberCookiesRemaining - blueFiveCookies
	const blueThreeCookies = Math.round(blueNumberCookies * 0.25)
	blueNumberCookiesRemaining = blueNumberCookiesRemaining - blueThreeCookies
	const blueOneCookies = blueNumberCookiesRemaining
	// console.log({ blueArrowCookies })
	// console.log({ blueSpinnerCookies })
	// console.log({ blueNumberCookies })
	// console.log({ blueTenCookies })
	// console.log({ blueFiveCookies })
	// console.log({ blueThreeCookies })
	// console.log({ blueOneCookies })

	const tokenArray: Array<string> = []

	for (let i = totalEmptyCells; i > 0; i--) {
		tokenArray.push("no_cookie")
	}

	for (let i = goldArrowCookies; i > 0; i--) {
		tokenArray.push("gold_arrow")
	}

	for (let i = goldSpinnerCookies; i > 0; i--) {
		tokenArray.push("gold_spinner")
	}

	for (let i = goldTenCookies; i > 0; i--) {
		tokenArray.push("gold_ten")
	}

	for (let i = goldFiveCookies; i > 0; i--) {
		tokenArray.push("gold_five")
	}

	for (let i = goldThreeCookies; i > 0; i--) {
		tokenArray.push("gold_three")
	}

	for (let i = goldOneCookies; i > 0; i--) {
		tokenArray.push("gold_one")
	}

	for (let i = redArrowCookies; i > 0; i--) {
		tokenArray.push("red_arrow")
	}

	for (let i = redSpinnerCookies; i > 0; i--) {
		tokenArray.push("red_spinner")
	}

	for (let i = redTenCookies; i > 0; i--) {
		tokenArray.push("red_ten")
	}

	for (let i = redFiveCookies; i > 0; i--) {
		tokenArray.push("red_five")
	}

	for (let i = redThreeCookies; i > 0; i--) {
		tokenArray.push("red_three")
	}

	for (let i = redOneCookies; i > 0; i--) {
		tokenArray.push("red_one")
	}

	for (let i = blueArrowCookies; i > 0; i--) {
		tokenArray.push("blue_arrow")
	}

	for (let i = blueSpinnerCookies; i > 0; i--) {
		tokenArray.push("blue_spinner")
	}

	for (let i = blueTenCookies; i > 0; i--) {
		tokenArray.push("blue_ten")
	}

	for (let i = blueFiveCookies; i > 0; i--) {
		tokenArray.push("blue_five")
	}

	for (let i = blueThreeCookies; i > 0; i--) {
		tokenArray.push("blue_three")
	}

	for (let i = blueOneCookies; i > 0; i--) {
		tokenArray.push("blue_one")
	}

	console.log({ tokenArray })

	const initialTokens = shuffleTokens(tokenArray)

	const initialBoard: ICell[][] = []

	for (let row = 0; row < numRows; row++) {
		const rowArray: ICell[] = []
		for (let col = 0; col < numCols; col++) {
			let color = ""
			let cookie = ""
			let token
			if (initialTokens.length > 0) {
				const splitArray = initialTokens.pop()?.split("_")
				color = splitArray?.[0] ?? ""
				cookie = splitArray?.[1] ?? ""
				if (color === "no" || cookie === "cookie") {
					color = ""
					cookie = ""
				}
				token = assignCookieToken(color, cookie) as JSX.Element
			}
			const thisCell: ICell = { row: row + 1, col: col + 1, bonusCookieColor: color, bonusCookie: cookie, bonusCookieToken: token }
			rowArray.push(thisCell)
		}
		initialBoard.push(rowArray)
	}

	function assignCookieToken(color: string, cookie: string) {
		let returnElement 

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

	return initialBoard
}
