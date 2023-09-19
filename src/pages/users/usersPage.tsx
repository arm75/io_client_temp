import React, { useState } from "react"
import CreateUserDialog from "./dialogs/createUserDialog"
import AllUsersTable from "./tables/allUsersTable/allUsersTable"
import { Button } from "../../components/ui/button"
import HomeLayout from "../../app/layouts/home/homeLayout"
import UpdateUserDialog from "./dialogs/updateUserDialog"

export default function UsersPage() {
	// CREATE USER modal state
	const [showCreateModal, setShowCreateModal] = useState(false)

	// UPDATE USER modal state and USERID to be loaded
	const [updateUserId, setUpdateUserId] = useState(null)
	const showUpdateModal = updateUserId !== null

	// DELETE USER modal state
	const [deleteUserId, setDeleteUserId] = useState(null)
	const showDeleteModal = deleteUserId !== null

	const onUpdateUserClick = (id: any) => {
		console.log(id)
		console.log("update user clicked")
	}

	const onDeleteUserClick = (id: any) => {
		console.log(id)
		console.log("delete user clicked")
	}

	return (
		<>
			<HomeLayout>
				<h1 className="text-3xl font-bold mb-2">Users</h1>
				<Button
					className="text-white bg-violet-500 border border-violet-900 hover:bg-violet-800"
					onClick={() => {
						setShowCreateModal(true)
					}}
				>
					Create User
				</Button>
				<AllUsersTable
					updateUserFn={onUpdateUserClick}
					deleteUserFn={onDeleteUserClick}
				/>
				<CreateUserDialog
					isOpen={showCreateModal}
					onClose={() => {
						setShowCreateModal(false)
					}}
					title="Create User"
					description="Please enter the new user's details."
				/>
				<UpdateUserDialog
					updateUserId={updateUserId}
					isOpen={showUpdateModal}
					onClose={() => {
						setUpdateUserId(null)
					}}
					title="Update User"
					description="Please update the new user's details."
				/>
			</HomeLayout>
		</>
	)
}
