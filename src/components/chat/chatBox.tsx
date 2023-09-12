import { useState, useEffect } from "react"
import socketClient from "socket.io-client"

const SOCKET_SERVER = "http://localhost:3500"

const chatMessages = [
	{
		name: "henry",
		text: "Once more unto the breach, dear friends,",
	},
	{
		name: "elizabeth",
		text: "Once more, or close the wall up with our English dead.",
	},
	{
		name: "richard",
		text: "In peace there's nothing so becomes a man",
	},
	{
		name: "victoria",
		text: "As modest stillness and humility,",
	},
	{
		name: "edward",
		text: "But when the blast of war blows in our ears,",
	},
	{
		name: "mary",
		text: "Then imitate the action of the tiger;",
	},
	{
		name: "charles",
		text: "Stiffen the sinews, summon up the blood,",
	},
	{
		name: "anne",
		text: "Disguise fair nature with hard-favoured rage.",
	},
	{
		name: "william",
		text: "Then lend the eye a terrible aspect;",
	},
	{
		name: "eleanor",
		text: "Let it pry through the portage of the head",
	},
	{
		name: "matilda",
		text: "Like the brass cannon; let the brow o'erwhelm it",
	},
	{
		name: "george",
		text: "As fearfully as doth a galled rock",
	},
	{
		name: "catherine",
		text: "O'erhang and jutty his confounded base,",
	},
	{
		name: "catherine",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget sem in dui fermentum iaculis. Donec vel condimentum odio. Maecenas ac mauris efficitur, commodo mauris quis, posuere ex. Sed viverra nunc eget sapien pretium aliquam. Ut vulputate auctor dolor eget elementum. Donec vestibulum augue laoreet est volutpat blandit. Cras pellentesque efficitur dui ut rhoncus. Vivamus sollicitudin, leo non bibendum pretium, enim lectus fringilla leo, tempor euismod velit felis vel eros.",
	},
	{
		name: "john",
		text: "Swill'd with the wild and wasteful ocean.",
	},
	{
		name: "eleanor",
		text: "Now set the teeth and stretch the nostril wide,",
	},
	{
		name: "william",
		text: "Hold hard the breath and bend up every spirit",
	},
	{
		name: "henry",
		text: "To his full height. On, on, you noblest English.",
	},
	{
		name: "eleanor",
		text: "Whose blood is fet from fathers of war-proof!",
	},
	{
		name: "john",
		text: "Fathers that, like so many Alexanders,",
	},
	{
		name: "anne",
		text: "Have in these parts from morn till even fought",
	},
	{
		name: "george",
		text: "And sheathed their swords for lack of argument.",
	},
	{
		name: "william",
		text: "Dishonour not your mothers; now attest",
	},
	{
		name: "henry",
		text: "That those whom you call'd fathers did beget you.",
	},
	{
		name: "eleanor",
		text: "Be copy now to men of grosser blood,",
	},
	{
		name: "matilda",
		text: "And teach them how to war. And you, good yeomen,",
	},
	{
		name: "william",
		text: "Whose limbs were made in England, show us here",
	},
	{
		name: "henry",
		text: "The mettle of your pasture; let us swear",
	},
	{
		name: "john",
		text: "That you are worth your breeding; which I doubt not;",
	},
	{
		name: "eleanor",
		text: "For there is none of you so mean and base",
	},
	{
		name: "elizabeth",
		text: "That hath not noble lustre in your eyes.",
	},
	{
		name: "victoria",
		text: "I see you stand like greyhounds in the slips,",
	},
	{
		name: "richard",
		text: "Straining upon the start. The game's afoot:",
	},
	{
		name: "mary",
		text: "Follow your spirit, and upon this charge",
	},
	{
		name: "charles",
		text: "Cry 'God for Harry, England, and Saint George!'",
	},
]

export default function ChatBox() {
	const socket = socketClient(SOCKET_SERVER)

	socket.on("connection", () => {
		console.log(`I'm connected with the back-end`)
	})

	const [message, setMessage] = useState("")
	const [messages, setMessages] = useState<string[]>([])

	useEffect(() => {
		console.log("useEffect ran")
		socket.on("chat message", (message: string) => {
			setMessages([...messages, message])
		})
	}, [messages])

	const handleSendMessage = () => {
		socket.emit("chat message", message)
		setMessage("")
	}

	return (
		<>
			<div className="w-full h-[250px] flex flex-col border bg-slate-800 border-gray-300 overflow-y-scroll">
				{messages.map((message, index) => (
					<>
						<div className={`${(index + 1) % 2 === 0 ? "bg-slate-800" : "bg-slate-900"} p-2`}>
							<div className="text-slate-100 text-xs">
								{/* <span className="text-slate-500">{message.name}&gt; </span> */}
								{message}
							</div>
						</div>
					</>
				))}
				{/* {chatMessages.map((message, index) => (
					<>
						<div className={`${(index + 1) % 2 === 0 ? "bg-slate-800" : "bg-slate-900"} p-2`}>
							<div className="text-slate-100 text-xs">
								<span className="text-slate-500">{message.name}&gt; </span>
								{message.text}
							</div>
						</div>
					</>
				))} */}
			</div>

			<div className="flex mt-2">
				<input
					type="text"
					className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
					placeholder="Type your message..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					onClick={handleSendMessage}
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
				>
					Send
				</button>
			</div>
		</>
	)
}
