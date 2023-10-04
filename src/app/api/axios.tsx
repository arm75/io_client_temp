import axios from "axios"
import IUser from "../../models/interfaces/user"
import { useQueryClient } from "@tanstack/react-query"

const useAxios = (baseURL: string = import.meta.env.VITE_APP_BASE_URL) => {
	const axiosInstance = axios.create({
		baseURL,
		withCredentials: true,
	})

	const queryClient = useQueryClient()

	const authMeQueryData: IUser | undefined = queryClient.getQueryData(["auth-me"])

	// Add a request interceptor
	axiosInstance.interceptors.request.use(
		(config) => {
			// Check if the user is in a game and not already on the /game/play page
			const isGameInProgress = authMeQueryData?.inGame
			const isOnGamePlayPage = window.location.pathname === "/game/play"

			if (isGameInProgress && !isOnGamePlayPage) {
				// Redirect to the play page
				window.location.href = "/game/play"
			}

			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)
	return axiosInstance
}

export default useAxios
