import ChatBox from "../../../components/chat/chatBox"
import { useGameContext } from "../../../components/game/contexts/gameContext"

export default function GameLayoutControls(props: any) {
	// const {children, pageTitle} = props

	// const queryClient = useQueryClient()
	// const authMeQueryData:IUser|undefined = queryClient.getQueryData("auth-me")

	const { hoverCoordinates, hoverCookieColor, hoverCookie } = useGameContext()

	return (
		<>
			{/* <!-- Logo Section --> */}
			<div className="flex justify-center pt-4 pl-2 mb-8">
				<a
					href="/"
					className="flex title-font font-medium items-center text-gray-100 mb-4 md:mb-0"
				>
					{/* <!-- LOGO SVG GOES INSIDE SPAN --> */}
					{/* <span className="w-12 h-12 mr-2 pt-1 bg-violet-700 relative rounded-full"></span> */}

					{/* <!-- Theme Title --> */}
					<span className="text-3xl">
						<span className="text-emerald-400">InWord</span>OutWord
					</span>
				</a>
			</div>

			{/* <!-- "NAVIGATION" Label --> */}
			{/* <div className="text-gray-500 self-center uppercase">Navigation</div> */}
			<hr className="text-emerald-900 my-10"></hr>
			<h1 className="text-slate-500 text-4xl">
				Current Cell:{" "}
				<span className="text-emerald-500 text-5xl">
					{hoverCoordinates.row}, {hoverCoordinates.col}
				</span>
				<br />
				Current Cookie Color: <span className="text-emerald-500 text-5xl">{hoverCookieColor}</span>
				<br />
				Current Cookie: <span className="text-emerald-500 text-5xl">{hoverCookie}</span>
			</h1>
		</>
	)
}
