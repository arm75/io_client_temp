import { createContext, useContext, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import useAxios from "../api/axios"
import IUser from "../../models/interfaces/user"

const AuthContext = createContext<Partial<IUser>>({})

export function useAuthContext() {
	return useContext(AuthContext)
}

export function AuthContextProvider({ children }: { children: JSX.Element }) {
	const [me, setMe] = useState({})

	const api = useAxios()

	useQuery(["auth-me"], async () => await api.get("/auth/me").then((res: any) => res.data), {
		onSettled: (data) => {
			console.log("Auth Context is providing: ", data)
			setMe(data)
		},
		refetchOnWindowFocus: false,
	})

	return <AuthContext.Provider value={me}>{children}</AuthContext.Provider>
}
