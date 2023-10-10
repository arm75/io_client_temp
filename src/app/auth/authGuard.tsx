import { Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "./authContext"

export default function AuthGuard({ children }: { children: JSX.Element }) {
	const location = useLocation()

	let content: JSX.Element = <></>

	const authContextData = useAuthContext()

	if (!authContextData) {
		content = (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		)
	} else {
		content = children
	}

	return content
}
