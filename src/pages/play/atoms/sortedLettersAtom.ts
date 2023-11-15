import { atom } from "jotai"

export interface ItemType {
	id: number
	name: string
}

export const sortedLettersAtom = atom<ItemType[]>([{ id: 0, name: "" }])
