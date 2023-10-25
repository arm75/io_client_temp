// SocketProvider.js
import React, { createContext, useContext, useState, useEffect } from "react"
import io from "socket.io-client"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

const SOCKET_SERVER = import.meta.env.VITE_APP_BASE_URL
const SocketContextNew = createContext<any>(null)

const SocketProviderNew = ({ children }: any) => {
	if (RENDER_LOG === "true") console.log("<SocketProviderNew> rendered...")
	const [socket, setSocket] = useState<any>(null)

	useEffect(() => {
		const socketInstance = io(SOCKET_SERVER, {
			withCredentials: true,
		})
		setSocket(socketInstance)

		// Clean up the socket connection when the provider unmounts
		return () => {
			console.log("Disconnect ran.")
			socketInstance.disconnect()
		}
	}, [])

	return <SocketContextNew.Provider value={socket}>{children}</SocketContextNew.Provider>
}

export const useSocketNew = () => {
	return useContext(SocketContextNew)
}

export default SocketProviderNew
