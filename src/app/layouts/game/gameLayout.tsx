import GameLayoutBoard from "./gameLayoutBoard"
import GameLayoutChat from "./gameLayoutChat"
import GameLayoutControls from "./gameLayoutControls"

export default function GameLayout(props: any) {
	const { children, pageTitle } = props

	return (
		<>
			<div className="grid grid-cols-12 h-screen">
				<div className="col-span-6 h-full bg-emerald-600 px-8 pt-2 pb-8">
					<GameLayoutBoard pageTitle={pageTitle}>{children}</GameLayoutBoard>
				</div>
				<div className="col-span-6 h-full grid grid-rows-10 bg-slate-900">
					<div className="row-start-1 row-end-7 bg-slate-600 p-8">
						<GameLayoutControls />
					</div>
					<div className="row-start-7 row-end-11 bg-slate-700 p-8">
						<GameLayoutChat />
					</div>
				</div>
			</div>
		</>
	)
}
