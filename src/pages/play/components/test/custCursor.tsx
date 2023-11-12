// CustomCursor.tsx
import React, { useEffect, useRef } from "react"
import CursorSVG from "./cursorSvg"
import Token from "./cursorSvg2"
import CursorSVG2 from "./cursorSvg2"

const CustCursor: React.FC = () => {
	const cursorRef = useRef<SVGSVGElement>(null)

	useEffect(() => {
		const svgString = new XMLSerializer().serializeToString(cursorRef.current!)
		document.body.style.cursor = `url("data:image/svg+xml,${encodeURIComponent(svgString)}"), auto`

		return () => {
			document.body.style.cursor = "auto"
		}
	}, [])

	return <CursorSVG2 ref={cursorRef} />
}

export default CustCursor
