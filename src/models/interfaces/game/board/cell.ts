export default interface ICell {
    row: number
    col: number
    // letterTile?:("a"|"b"|"c"|"d"|"e"|"f"|"g"|"h"|"i"|"j"|"k"|"l"|"m"|"n"|"o"|"p"|"q"|"r"|"s"|"t"|"u"|"v"|"w"|"x"|"y"|"z")
    // bonusCookieColor?:("gold" | "blue" | "red")
    // bonusCookie?:("one"|"three"|"five"|"ten"|"arrow"|"spinner")
    letterTile?: string
    bonusCookieColor?: string
    bonusCookie?: string
    bonusCookieToken?: JSX.Element
}
