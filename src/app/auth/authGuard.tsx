import { Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "./authContext"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function AuthGuard({ children }: { children: JSX.Element }) {
	if (RENDER_LOG === "true") console.log("<AuthGuard> rendered...")
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
