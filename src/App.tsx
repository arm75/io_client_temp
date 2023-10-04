import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import LoginPage from "./pages/loginPage"
import AuthGuard from "./app/auth/authGuard"
import PageNotFound from "./pages/pageNotFound"
import UsersPage from "./pages/users/usersPage"
import PlayPage from "./pages/play/playPage"
import GamesPage from "./pages/games/gamesPage"

export default function App() {
	// let content: JSX.Element = <></>

	// const api = useAxios(SOCKET_SERVER)

	// const authMeQueryData = useQuery(["auth-me"], async () => await api.get("auth/me").then((res: any) => res.data), {
	// 	refetchOnWindowFocus: false,
	// })

	// if (authMeQueryData.isLoading || authMeQueryData.isFetching) {
	// 	content = <p className="">Loading...</p>
	// }

	// if (authMeQueryData.isError) {
	// 	content = <p className="errmsg">whatev</p>
	// }

	// if (authMeQueryData.isSuccess) {
	// 	content = (

	return (
		<>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<AuthGuard>
								<GamesPage />
							</AuthGuard>
						}
					/>
					<Route path="/game">
						{/* Nested route for "/game/play" */}
						<Route
							path="play"
							element={
								<AuthGuard>
									<PlayPage />
								</AuthGuard>
							}
						/>
						{/* Nested route for "/game/list" */}
						{/* <Route
								path="new"
								element={<GameLayoutNew />}
							/> */}
					</Route>
					<Route
						path="/admin/users"
						element={
							<AuthGuard>
								<UsersPage />
							</AuthGuard>
						}
					/>
					<Route
						path="/login"
						element={<LoginPage />}
					/>
					<Route
						path="/404"
						element={<PageNotFound />}
					/>
					<Route
						path="*"
						element={<Navigate to="/404" />}
					/>
				</Routes>
			</Router>
		</>
	)
}
