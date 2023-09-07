import { useGameContext } from "../../../components/game/contexts/gameContext"

export default function HomeLayoutSidebar(props: any) {
	// const {children, pageTitle} = props

	// const queryClient = useQueryClient()
	// const authMeQueryData:IUser|undefined = queryClient.getQueryData("auth-me")

	const { hoverCoordinates } = useGameContext()

	return (
		<>
			{/* <!-- Logo Section --> */}
			<div className="pt-4 pl-2 mb-8">
				<a
					href="/"
					className="flex title-font font-medium items-center text-gray-100 mb-4 md:mb-0"
				>
					{/* <!-- LOGO --> */}
					{/* <span className="w-12 h-12 mr-2 pt-1 bg-violet-700 relative rounded-full">
                            <svg className="text-white" viewBox="-275 -300 2600 2600" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m1275.41 530.876-260.28-311.979-253.693 319.097 513.973-7.118Zm356.11-378.808-572.04 7.923 290.92 349.744 281.12-357.667Zm-251.91 447.717L1091.47 1693.24 1988.2 591.356l-608.59 8.429ZM1034.58 1623.68l269.76-1022.853-569.886 7.894L1034.58 1623.68ZM610.9 540.079l-561.281 7.775 274.777-349.541L610.9 540.079ZM50.593 618.193 977.495 1694.82 659.187 609.763l-608.594 8.43Zm1936.637-97.177L1702.87 179.22l-276.93 349.571 561.29-7.775ZM967.009 161.272l-572.035 7.923 290.917 349.744 281.118-357.667Z"
                                ></path>
                            </svg>
                        </span> */}

					{/* <!-- Theme Title --> */}
					<span className="text-3xl text-violet-300">InWord</span>
					<span className="text-3xl">OutWord</span>
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
			</h1>
		</>
	)
}
