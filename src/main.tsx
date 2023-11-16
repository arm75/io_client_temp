import "./index.css"
import ReactDOM from "react-dom/client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import App from "./App.tsx"
import { Toaster } from "./components/shadcn/ui/toaster.tsx"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import SocketStateContainer from "./app/containers/socketStateContainer.tsx"
import { ToastContextProvider } from "./app/context/toast/toastContextProvider.tsx"
import AuthStateContainer from "./app/containers/authStateContainer.tsx"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<AuthStateContainer>
			<ToastContextProvider>
				<SocketStateContainer>
					<>
						{RENDER_LOG === "true" ? console.log("<Main> rendered...") : null}
						<App />
						<Toaster />

						{/* <iframe data-xstate></iframe> */}
						<ReactQueryDevtools />
					</>
				</SocketStateContainer>
			</ToastContextProvider>
		</AuthStateContainer>
	</QueryClientProvider>
)
