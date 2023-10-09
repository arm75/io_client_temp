import IUser from "../../user"
import ICell from "./cell"

export default interface IGame {
	id?: string
	creator?: IUser
	name: string
	description?: string
	players?: IUser[]
	status?: boolean
	started?: boolean
	complete?: boolean
	board?: ICell[][]
	letterPool?: string[]
}
