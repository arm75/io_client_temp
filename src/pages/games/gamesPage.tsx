import { useState } from "react"
import GamesTable from "./tables/gamesTable/gamesTable"
import { Button } from "../../components/shadcn/ui/button"
import HomeLayout from "../../app/layouts/home/homeLayout"
import CreateGameDialog from "./dialogs/createGameDialog"
import UpdateGameDialog from "./dialogs/updateGameDialog"
import CancelGameDialog from "./dialogs/cancelGameDialog"
import DeleteGameDialog from "./dialogs/deleteGameDialog"
import JoinGameDialog from "./dialogs/joinGameDialog"
import { useSocketContext } from "../../app/context/socketContext"

export default function GamesPage() {
	//const socket = useSocketContext()

	// CREATE Game modal state
	const [showCreateModal, setShowCreateModal] = useState(false)

	// JOIN Game modal state and GameID to be loaded
	const [joinGameId, setJoinGameId] = useState(null)
	const showJoinModal = joinGameId !== null

	// UPDATE Game modal state and GameID to be loaded
	const [updateGameId, setUpdateGameId] = useState(null)
	const showUpdateModal = updateGameId !== null

	// CANCEL Game modal state
	const [cancelGameId, setCancelGameId] = useState(null)
	const showCancelModal = cancelGameId !== null

	// DELETE Game modal state
	const [deleteGameId, setDeleteGameId] = useState(null)
	const showDeleteModal = deleteGameId !== null

	const onJoinGameClick = (id: any) => {
		//console.log(id)
		//console.log("update Game clicked")
		setJoinGameId(id)
	}

	const onUpdateGameClick = (id: any) => {
		//console.log(id)
		//console.log("update Game clicked")
		setUpdateGameId(id)
	}

	const onCancelGameClick = (id: any) => {
		//console.log(id)
		//console.log("update Game clicked")
		setCancelGameId(id)
	}

	const onDeleteGameClick = (id: any) => {
		//console.log(id)
		//console.log("delete Game clicked")
		setDeleteGameId(id)
	}

	// const goToPlayPage = () => {
	// 	window.location.href = "/game/play"
	// }

	// const handleClearUsers = () => {
	// 	socket.emit("clearUsers", "651377127cfcf5e11c0f2cc8")
	// }

	return (
		<>
			<HomeLayout>
				<h1 className="text-3xl font-bold mb-2">Games</h1>
				<Button
					className="text-white bg-emerald-500 border border-emerald-900 hover:bg-emerald-800"
					onClick={() => {
						setShowCreateModal(true)
					}}
				>
					Create Game
				</Button>
				<GamesTable
					joinGameFn={onJoinGameClick}
					updateGameFn={onUpdateGameClick}
					cancelGameFn={onCancelGameClick}
					deleteGameFn={onDeleteGameClick}
				/>
				<CreateGameDialog
					isOpen={showCreateModal}
					onClose={() => {
						setShowCreateModal(false)
					}}
					title="Create Game"
					description="Please enter the new Game's details."
				/>
				<JoinGameDialog
					joinGameId={joinGameId}
					isOpen={showJoinModal}
					onClose={() => {
						setJoinGameId(null)
					}}
					title="Join Game"
					description="DETAIL STRING"
				/>
				<UpdateGameDialog
					updateGameId={updateGameId}
					isOpen={showUpdateModal}
					onClose={() => {
						setUpdateGameId(null)
					}}
					title="Update Game"
					description="Please update the new Game's details."
				/>
				<CancelGameDialog
					cancelGameId={cancelGameId}
					isOpen={showCancelModal}
					onClose={() => {
						setCancelGameId(null)
					}}
					title="Cancel Game"
					description="Are you sure you want to cancel the game?"
				/>
				<DeleteGameDialog
					deleteGameId={deleteGameId}
					isOpen={showDeleteModal}
					onClose={() => {
						setDeleteGameId(null)
					}}
					title="Delete Game"
					description="Are you sure you want to delete the game?"
				/>
			</HomeLayout>
		</>
	)
}
