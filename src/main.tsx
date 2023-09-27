import "./index.css"
//import { useState, useMemo, createContext } from 'react'
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SocketContextProvider } from "./app/context/socketContext.tsx"
import { GameStateContextProvider } from "./components/game/contexts/gameStateContext.tsx"
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<GameStateContextProvider>
			<SocketContextProvider>
				<App />
			</SocketContextProvider>
		</GameStateContextProvider>
		<ReactQueryDevtools />
	</QueryClientProvider>
)
