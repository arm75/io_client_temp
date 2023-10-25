import "./index.css"
import ReactDOM from "react-dom/client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { AuthContextProvider } from "./app/auth/authContext.tsx"
import { SocketContextProvider } from "./app/context/socketContext.tsx"
import { ToasterContextProvider } from "./app/context/toasterContext.tsx"
import { GameStateContextProvider } from "./components/game/contexts/gameStateContext.tsx"
import App from "./App.tsx"
import { Toaster } from "./components/shadcn/ui/toaster.tsx"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import SocketProvider from "./app/providers/socketProvider.tsx"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<AuthContextProvider>
			<ToasterContextProvider>
				{/* <GameStateContextProvider>
					<SocketContextProvider> */}
				<SocketProvider>
					<>
						{RENDER_LOG === "true" ? console.log("<Main> rendered...") : null}
						<App />
						<Toaster />
						<ReactQueryDevtools />
					</>
				</SocketProvider>
				{/* </SocketContextProvider>
				</GameStateContextProvider> */}
			</ToasterContextProvider>
		</AuthContextProvider>
	</QueryClientProvider>
)
