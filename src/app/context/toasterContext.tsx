import { createContext, useContext } from "react"
import { useToast } from "../../components/shadcn/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"

const ToasterContext = createContext<any>({})

export function useToasterContext() {
	return useContext(ToasterContext)
}

export function ToasterContextProvider({ children }: { children: JSX.Element }) {
	const { toast } = useToast()

	const showToast = (variant: string, message = "Success!", title?: string) => {
		let color = ""

		switch (variant) {
			case "default":
				color = "slate"
				break
			case "destructive":
				color = "red"
				break
			case "success":
				color = "emerald"
				break
			case "info":
				color = "sky"
				break
			case "warning":
				color = "yellow"
				break
			case "error":
				color = "red"
				break
			default:
				color = "slate"
				break
		}

		toast({
			variant: variant as "default" | "destructive" | "success" | "info" | "warning" | "error" | null | undefined,
			title: title,
			description: message,
			action: (
				<ToastAction
					className={`border border-${color}-700 p-2 rounded`}
					altText="Close"
				>
					Close
				</ToastAction>
			),
		})
	}

	const contextValue = {
		showToast,
	}

	return <ToasterContext.Provider value={contextValue}>{children}</ToasterContext.Provider>
}
