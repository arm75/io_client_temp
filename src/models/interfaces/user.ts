export default interface IUser {
	id?: string
	username: string
	password?: string
	firstname?: string
	lastname?: string
	email?: string
	age?: number
	active?: boolean
	role?: string
	//rolesArray?: Array<string>
}
