import React, { useEffect, useRef } from "react"

const BoxShadowExperiment = (props: any) => {
	// const { lettersAttached } = props

	const bsDivRef: any = useRef(null)

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
			className="fixed bg-white text-red-500 top-1/2 left-1/2 transform -translate-x-[46px] -translate-y-1/2 flex pointer-events-none z-50"
			ref={bsDivRef}
		>
			<div className="letter p-4 flex justify-center items-center w-[46px] h-[46px] border-4 border-black text-black text-1.7rem">
				A
			</div>
			<div className="letter p-4 flex justify-center items-center w-[46px] h-[46px] border-4 border-black text-black text-1.7rem">
				P
			</div>
			<div className="letter p-4 flex justify-center items-center w-[46px] h-[46px] border-4 border-black text-black text-1.7rem">
				P
			</div>
			<div className="letter p-4 flex justify-center items-center w-[46px] h-[46px] border-4 border-black text-black text-1.7rem">
				L
			</div>
			<div className="letter p-4 flex justify-center items-center w-[46px] h-[46px] border-4 border-black text-black text-1.7rem">
				E
			</div>
		</div>
	)
}

export default BoxShadowExperiment
