import { createContext, useContext, useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "../../components/shadcn/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"

const ToasterContext = createContext<any>(null)

export function useToasterContext() {
	return useContext(ToasterContext)
}

export function ToasterContextProvider({ children }: { children: JSX.Element }) {
	const [hello, setHello] = useState("hello")

	const { toast } = useToast()

	const queryClient = useQueryClient()

	const showToast = (variant: string) => {
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
			title: "Uh oh! Something went wrong.",
			description: "There was a problem with your request.",
			action: (
				<ToastAction
					className={`border border-${color}-700 p-2 rounded`}
					altText="Try again"
				>
					Try again
				</ToastAction>
			),
		})
	}

	const contextValue = {
		hello,
		setHello,
		showToast,
	}

	return <ToasterContext.Provider value={contextValue}>{children}</ToasterContext.Provider>
}
