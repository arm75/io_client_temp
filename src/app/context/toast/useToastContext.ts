import { useContext } from "react"
import toastContext from "./toastContext"

export default function useToasterContext() {
	return useContext(toastContext())
}
