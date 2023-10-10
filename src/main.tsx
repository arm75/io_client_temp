import "./index.css"
//import { useState, useMemo, createContext } from 'react'
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SocketContextProvider } from "./app/context/socketContext.tsx"
import { GameStateContextProvider } from "./components/game/contexts/gameStateContext.tsx"
import { Toaster } from "./components/shadcn/ui/toaster.tsx"
import { ToasterContextProvider } from "./app/context/toasterContext.tsx"
import { AuthContextProvider } from "./app/auth/authContext.tsx"
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<AuthContextProvider>
			<>
				<ToasterContextProvider>
					<>
						<GameStateContextProvider>
							<SocketContextProvider>
								<App />
							</SocketContextProvider>
						</GameStateContextProvider>
						<Toaster />
					</>
				</ToasterContextProvider>
				<ReactQueryDevtools />
			</>
		</AuthContextProvider>
	</QueryClientProvider>
)
