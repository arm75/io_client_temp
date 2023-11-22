import { atom } from "jotai"
import { WordFragment } from "../../../models/interfaces/wordFragment"

export const chosenWordAtom = atom<WordFragment>({ word: "" })

export const chosenWordLengthAtom = atom((get) => {
	const wordChosen = get(chosenWordAtom)
	return wordChosen.word.length
})

// export const chosenWordLengthAtom = atom(
// 	(get) => get(chosenWordAtom),
// 	(get, set, new:any) => {
// 		set(chosenWordAtom, newPrice.word.length())
// 		// you can set as many atoms as you want at the same time
// 	}
// )
