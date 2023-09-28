import { useState } from "react"
import CreateUserDialog from "./dialogs/createUserDialog"
import AllUsersTable from "./tables/allUsersTable/allUsersTable"
import { Button } from "../../components/shadcn/button"
import HomeLayout from "../../app/layouts/home/homeLayout"
import UpdateUserDialog from "./dialogs/updateUserDialog"
import DeleteUserDialog from "./dialogs/deleteUserDialog"

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
		//console.log(id)
		//console.log("update user clicked")
		setUpdateUserId(id)
	}

	const onDeleteUserClick = (id: any) => {
		console.log(id)
		console.log("delete user clicked")
		setDeleteUserId(id)
	}

	return (
		<>
			<HomeLayout>
				<h1 className="text-3xl font-bold mb-2">Users</h1>
				<Button
					className="text-white bg-emerald-500 border border-emerald-900 hover:bg-emerald-800"
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
				<DeleteUserDialog
					deleteUserId={deleteUserId}
					isOpen={showDeleteModal}
					onClose={() => {
						setDeleteUserId(null)
					}}
					title="Delete User"
					description="Are you sure you want to delete the user?"
				/>
			</HomeLayout>
		</>
	)
}
