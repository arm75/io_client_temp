import HomeLayoutSidebar from "./homeLayoutSidebar"
import HomeLayoutContent from "./homeLayoutContent"

export default function HomeLayout(props: any) {
	const { children, pageTitle } = props

	return (
		<>
			<div className="min-h-screen grid grid-cols-12">
				<div className="bg-slate-100 col-span-6 h-screen overflow-auto p-4">
					<HomeLayoutContent pageTitle={pageTitle}>{children}</HomeLayoutContent>
				</div>
				<div className="bg-slate-700 col-span-6 p-8 h-screen overflow-auto">
					<HomeLayoutSidebar />
				</div>
			</div>
		</>
	)
}
