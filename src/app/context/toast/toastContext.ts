import { createContext } from "react"

export default function toastContext() {
	const toastContext = createContext<any>({})

	return toastContext
}
