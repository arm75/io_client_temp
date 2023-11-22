import { atom } from "jotai"

const numRows = 18
const numCols = 18

const hoverStates: boolean[][] = []

for (let row = 0; row < numRows; row++) {
	const hoverStatesRowArray: boolean[] = []
	for (let col = 0; col < numCols; col++) {
		hoverStatesRowArray.push(false)
	}
	hoverStates.push(hoverStatesRowArray)
}

const hoverStatesReset = hoverStates

export const hoverCoordinatesAtom = atom({ row: 0, col: 0 })
export const hoverCookieColorAtom = atom("")
export const hoverCookieAtom = atom("")
export const hoverStatesAtom = atom(hoverStates)
export const hoverStatesResetAtom = atom(hoverStatesReset)
