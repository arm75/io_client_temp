import { useAtomValue } from "jotai"
import { useEffect, useRef } from "react"
import { chosenWordAtom } from "../../atoms/chosenWordAtom"

const RENDER_LOG = import.meta.env.VITE_APP_RENDER_LOG

const ChosenWordToPlay = (props: any) => {
	if (RENDER_LOG === "true") console.log("<ChosenWordToPlay> rendered...")

	const bsDivRef: any = useRef(null)

	const wordFragment = useAtomValue(chosenWordAtom)

	console.log(wordFragment)

	useEffect(() => {
		let x, y

		const handleMouseMove = (event: any) => {
			x = event.clientX
			y = event.clientY

			if (typeof x !== "undefined" && bsDivRef.current) {
				bsDivRef.current.style.left = x + "px"
				bsDivRef.current.style.top = y + "px"
			}
		}

		// Add event listener on component mount
		window.addEventListener("mousemove", handleMouseMove, false)

		// Clean up event listener on component unmount
		return () => {
			window.removeEventListener("mousemove", handleMouseMove, false)
		}
	}, []) // Empty dependency array to run the effect only once on mount

	return (
		<div
			className="fixed bg-white text-red-500 top-1/2 left-1/2 transform -translate-x-[18px] -translate-y-[36px] flex pointer-events-none z-50"
			// className="fixed bg-white text-red-500 top-1/2 left-1/2 transform -translate-x-[46px] -translate-y-1/2 flex pointer-events-none z-50"
			ref={bsDivRef}
		>
			{Array.from(wordFragment?.word).map((char: string, index: number) => (
				<div
					key={`picked-up-${index}`}
					className="letter p-4 flex justify-center items-center w-[46px] h-[46px] border-4 border-red-500 text-black text-1.7rem"
				>
					{char.toUpperCase()}
				</div>
			))}
		</div>
	)
}

export default ChosenWordToPlay
