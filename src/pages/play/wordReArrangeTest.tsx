import React, { FC, useState } from "react"
import { ReactSortable } from "react-sortablejs"

interface ItemType {
	id: number
	name: string
}

export const WordReArrangeTest: FC = (props) => {
	const [state, setState] = useState<ItemType[]>([
		{ id: 1, name: "A" },
		{ id: 2, name: "G" },
		{ id: 3, name: "T" },
		{ id: 4, name: "Y" },
		{ id: 5, name: "U" },
		{ id: 6, name: "I" },
		{ id: 7, name: "R" },
		{ id: 8, name: "Z" },
	])

	return (
		<>
			<ReactSortable
				list={state}
				setList={setState}
				animation={150}
			>
				{state.map((item) => (
					<div
						className="inline-flex justify-center items-center w-[46px] h-[46px] m-2 border text-white bg-slate-300 hover:bg-emerald-300 hover:border-emerald-600 border-slate-800"
						key={item.id}
					>
						{item.name}
					</div>
				))}
			</ReactSortable>
		</>
	)
}
