import { atom } from "jotai"
import { WordFragment } from "../../../models/interfaces/wordFragment"

export const chosenWordAtom = atom<WordFragment>({ word: "" })
