import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import LoginPage from "./pages/loginPage"
import AuthGuard from "./app/auth/authGuard"
import PageNotFound from "./pages/pageNotFound"
import UsersPage from "./pages/users/usersPage"
import PlayPage from "./pages/play/playPage"
import GamesPage from "./pages/games/gamesPage"
import { WordReArrangeTest } from "./pages/play/wordReArrangeTest"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

export default function App() {
	if (RENDER_LOG === "true") console.log("<App> rendered...")

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
						<Route
							path="play"
							element={
								<AuthGuard>
									<PlayPage />
								</AuthGuard>
							}
						/>
						{/* Nested route for "/game/list" */}
						<Route
							path="wordtest"
							element={<WordReArrangeTest />}
						/>
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
