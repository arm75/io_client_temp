import GameLayoutSidebar from "./gameLayoutSidebar"
import GameLayoutContent from "./gameLayoutContent"

export default function GameLayout(props: any) {
	const { children, pageTitle } = props

	return (
		<>
			<div className="min-h-screen grid grid-cols-12">
				<div className="bg-slate-100 col-span-6 h-screen overflow-auto p-4">
					<GameLayoutContent pageTitle={pageTitle}>{children}</GameLayoutContent>
				</div>
				<div className="bg-slate-700 col-span-6 p-8 h-screen overflow-auto">
					<GameLayoutSidebar />
				</div>
			</div>
		</>
	)
}
