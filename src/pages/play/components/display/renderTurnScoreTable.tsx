const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

const customStyles = {
	fontFamily: "emoji",
}

export default function RenderTurnScoreTable({ players }: any) {
	if (RENDER_LOG === "true") console.log("<RenderTurnScoreTable> rendered...")

	return (
		<div className="mb-4 bg-slate-800 rounded-md">
			<div className="flex select-none bg-slate-800 rounded-md p-2">
				<table className="table-auto min-w-full border-8 border-slate-900">
					<thead>
						<tr className="">
							<td className="bg-slate-900 text-slate-600 text-center p-1">TURN</td>
							<td className="bg-slate-900 text-slate-600 text-center p-1">ORDER</td>
							<td className="bg-slate-900 text-slate-600 text-center p-1">PLAYER</td>
							<td className="bg-slate-900 text-slate-600 text-center p-1">SCORE</td>
						</tr>
					</thead>
					<tbody>
						{players?.map((player: any, index: number) => (
							<tr key={`turnscore-${index}`}>
								<td
									className="px-8 text-yellow-500 text-4xl text-center"
									style={customStyles}
								>
									{player?.turn ? <>&lowast;</> : <></>}
								</td>
								<td className="p-2 px-8 text-slate-600 text-xl text-center">{index + 1}</td>
								<td className="p-2 px-8 text-white text-xl text-center">{player?.user?.username}</td>
								<td className="p-2 px-8 text-white text-xl text-center">{player?.score}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
