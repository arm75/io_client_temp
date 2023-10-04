import React, { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import useAxios from "../app/api/axios"
//impo1rt { useSomeContext } from '../app/contexts/someContextProvider'
//import Button from 'react-bootstrap/Button'
//import CreateUserModal from '../components/modals/users/createUserModal'
//import UpdateUserModal from '../components/modals/users/updateUserModal'
//import DeleteUserModal from '../components/modals/users/deleteUserModal'

export default function UsersPageOld(props: any) {
	////// VARS //////
	// table columns
	const usersColumns = [
		{
			header: "Id",
			accessor: "id",
		},
		{
			header: "UserName",
			accessor: "username",
		},
		{
			header: "Roles",
			accessor: "roles",
		},
	]
	const api = useAxios()

	// component output
	let content: JSX.Element = <></>

	////// STATE //////
	// CREATE USER modal state
	const [showCreateModal, setShowCreateModal] = useState(false)

	// UPDATE USER modal state and USERID to be loaded
	const [updateUserId, setUpdateUserId] = useState(null)
	const isUpdateUserModalShown = updateUserId !== null

	// DELETE USER modal state
	const [deleteUserId, setDeleteUserId] = useState(null)
	const isDeleteUserModalShown = deleteUserId !== null

	////// CONTEXT //////
	//const { someBool, toggleSomeBool } = useSomeContext()

	////// REACT-QUERY //////
	// GET ALL USERS
	const getAllUsersQuery = useQuery(["get-all-users"], async () => await api.get("/users").then((res) => res.data), {
		refetchOnWindowFocus: false,
	})

	// useEffect(() => {
	//     getAllUsersQuery.refetch(); // Enable and trigger the query on mount
	//   }, [getAllUsersQuery.refetch]);

	// UPDATE (EDIT) USER
	const onUpdateUserClick = async ({ id }: any) => {
		setUpdateUserId(id)
	}

	// DELETE (EDIT) USER
	const onDeleteUserClick = async ({ id }: any) => {
		setDeleteUserId(id)
	}

	////// BEGIN COMPONENT OUTPUT //////
	// test for component state then set value...
	if (getAllUsersQuery.isLoading || getAllUsersQuery.isFetching) {
		content = <p>Loading...</p>
	}

	if (getAllUsersQuery.isError) {
		content = <p className="errmsg">whatev</p>
	}

	if (getAllUsersQuery.isSuccess) {
		const usersData = []

		// transform data for table. needs to be extracted out to custom function...
		for (const objKey in getAllUsersQuery.data) {
			const obj: any = getAllUsersQuery.data[objKey]
			usersData.push({
				id: obj._id,
				username: obj.username,
				password: obj.password,
				roles: obj.roles.toString().replaceAll(",", ", "),
				rolesArray: obj.roles,
			})
		}

		// console.log({usersColumns})
		// console.log({usersData})

		content = (
			<>
				{/* <CardWide pageTitle="Some Message" cardTitle="Here is a message" content={
                <>
                    <h5>Here is a wee little message bloke!!!</h5>
                    <h6>Some Bool {someBool.toString()}</h6>
                    <Button onClick={toggleSomeBool}>Toggle Some Bool</Button>
                </>
            }/> */}

				<button onClick={() => setShowCreateModal(true)}>Create User</button>

				{/* <ToastTest /> */}

				{/* CREATE USER modal */}
				{/* <CreateUserModal show={showCreateModal} onHide={() => setShowCreateModal(false)}/> */}

				{/* UPDATE USER modal */}
				{/* <UpdateUserModal show={isUpdateUserModalShown} updateUserId={updateUserId} onHide={() => setUpdateUserId(null)}/> */}

				{/* DELETE USER modal */}
				{/* <DeleteUserModal show={isDeleteUserModalShown} deleteUserId={deleteUserId} onHide={() => setDeleteUserId(null)}/>             */}
			</>
		)
	}

	return content
}
