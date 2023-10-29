import "./index.css"
import ReactDOM from "react-dom/client"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ToasterContextProvider } from "./app/context/toasterContext.tsx"
import App from "./App.tsx"
import { Toaster } from "./components/shadcn/ui/toaster.tsx"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import SocketStateContainer from "./app/containers/socketStateContainer.tsx"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		{/* <AuthStateContainer> */}
		<ToasterContextProvider>
			<SocketStateContainer>
				<>
					{RENDER_LOG === "true" ? console.log("<Main> rendered...") : null}
					<App />
					<Toaster />
					<ReactQueryDevtools />
				</>
			</SocketStateContainer>
		</ToasterContextProvider>
		{/* </AuthStateContainer> */}
	</QueryClientProvider>
)
