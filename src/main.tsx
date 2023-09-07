import "./index.css"
//import { useState, useMemo, createContext } from 'react'
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { GameContextProvider } from "./components/game/contexts/gameContext.tsx"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<GameContextProvider>
			<App />
		</GameContextProvider>
		<ReactQueryDevtools />
	</QueryClientProvider>
)
