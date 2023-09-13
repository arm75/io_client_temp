import React, { createContext, useContext, useEffect } from "react"
import io from "socket.io-client"

const SOCKET_SERVER = "http://localhost:3500"
const SocketContext = createContext<any>(null)

export function useSocketContext() {
	return useContext(SocketContext)
}

export function SocketContextProvider({ children }: { children: JSX.Element }) {
	const socket = io(SOCKET_SERVER) // Initialize the socket

	useEffect(() => {
		// Clean up the connection when the component unmounts
		return () => {
			socket.disconnect()
		}
	}, [])

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
