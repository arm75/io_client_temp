import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from "../../../../components/shadcn/ui/table"

export default function RenderTurnScoreTable({ players }: any) {
	console.log(players)

	return (
		<div className="mb-4 bg-slate-800 rounded-md">
			<div className="flex select-none bg-slate-800 rounded-md p-4">
				<table className="table-auto min-w-full border-8 border-slate-900 rounded-md">
					<thead>
						<tr className="">
							<td className="bg-slate-900 text-slate-600 text-center p-1">TURN</td>
							<td className="bg-slate-900 text-slate-600 text-center p-1">PLAYER</td>
							<td className="bg-slate-900 text-slate-600 text-center p-1">SCORE</td>
						</tr>
					</thead>
					<tbody>
						{players?.map((player: any, index: number) => {
							console.log(player)
							return (
								<tr key={`turnscore-${index}`}>
									<td className="p-2 px-8 text-yellow-500 text-xl text-center">{player?.turn ? "X" : ""}</td>
									<td className="p-2 px-8 text-white text-xl text-center">{player?.user?.username}</td>
									<td className="p-2 px-8 text-white text-xl text-center">{player?.score}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
