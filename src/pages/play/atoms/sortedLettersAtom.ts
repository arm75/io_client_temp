import { atom } from "jotai"
import { ItemType } from "../../../models/interfaces/itemType"

export const sortedLettersAtom = atom<ItemType[]>([{ id: 0, name: "" }])
