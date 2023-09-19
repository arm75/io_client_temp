import React, { createContext, useContext, useEffect, useState } from "react"
import io from "socket.io-client"

const SOCKET_SERVER = "http://localhost:3500"
const SocketContext = createContext<any>(null)

export function useSocketContext() {
	return useContext(SocketContext)
}

export function SocketContextProvider({ children }: { children: JSX.Element }) {
	const initialSocket = io(SOCKET_SERVER) // Initialize the socket
	const [socket, setSocket] = useState(initialSocket)

	useEffect(() => {
		// Update the 'socket' state whenever it changes in the context
		setSocket(initialSocket)
	}, [initialSocket]) // Include 'initialSocket' in the dependency array

	useEffect(() => {
		// Add event listeners or other socket logic here
		// socket.on("someEvent", (data) => {
		// 	console.log("Received data from socket:", data)
		// })

		return () => {
			// Clean up event listeners if needed
			// socket.off("someEvent")
		}
	}, [socket]) // Include 'socket' in the dependency array

	useEffect(() => {
		// Clean up the connection when the component unmounts
		return () => {
			socket.disconnect()
		}
	}, [socket])

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
