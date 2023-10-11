import { createContext, useContext, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import useAxios from "../api/axios"
import IUser from "../../models/interfaces/user"

const AuthContext = createContext<Partial<IUser>>({})

export function useAuthContext() {
	return useContext(AuthContext)
}

export function AuthContextProvider({ children }: { children: JSX.Element }) {
	let content: JSX.Element = <></>

	const [me, setMe] = useState({})

	const api = useAxios()

	const authQueryData = useQuery(["auth-me"], async () => await api.get("/auth/me").then((res: any) => res.data), {
		onSettled: (data) => {
			console.log("Auth Context is providing: ", data)
			setMe(data)
		},
		refetchOnWindowFocus: false,
	})

	if (authQueryData.isLoading || authQueryData.isFetching) {
		content = <></>
	}

	if (authQueryData.isError) {
		content = <></>
	}

	if (authQueryData.isSuccess) {
		content = <AuthContext.Provider value={me}>{children}</AuthContext.Provider>
	}

	return content
}
