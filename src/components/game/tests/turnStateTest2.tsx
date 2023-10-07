import React, { useReducer, useEffect } from "react"
import { toast, useToast } from "../../shadcn/ui/use-toast"
import { Button } from "../../shadcn/ui/button"
import { ToastAction } from "@radix-ui/react-toast"
import { useToasterContext } from "../../../app/context/toasterContext"

// Define the top-level states
enum MainState {
	NotYourTurn,
	YourTurn,
}

// Define the sub-states within YourTurn state
enum SubState {
	ChoosingLetter,
	ChoosingCell,
	ReadyToPlay,
}

// Define actions to transition between states
enum ActionType {
	ToggleState,
}

// Define action types
interface Action {
	type: ActionType
}

// Define the initial state
interface State {
	mainState: MainState
	subState: SubState
}

const initialState: State = {
	mainState: MainState.NotYourTurn,
	subState: SubState.ChoosingLetter, // Initial sub-state
}

// Reducer function to handle state transitions
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case ActionType.ToggleState:
			switch (state.mainState) {
				case MainState.YourTurn:
					switch (state.subState) {
						case SubState.ChoosingLetter:
							return {
								...state,
								subState: SubState.ChoosingCell,
							}
						case SubState.ChoosingCell:
							return {
								...state,
								subState: SubState.ReadyToPlay,
							}
						case SubState.ReadyToPlay:
							return {
								...state,
								mainState: MainState.NotYourTurn,
								subState: SubState.ChoosingLetter,
							}
						default:
							return state
					}
				case MainState.NotYourTurn:
					return {
						...state,
						mainState: MainState.YourTurn,
						subState: SubState.ChoosingLetter,
					}
				default:
					return state
			}
	}
}

// Component to use the state machine
const StateMachineComponent2: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { showToast } = useToasterContext()

	// Callback functions for each state
	useEffect(() => {
		switch (state.mainState) {
			case MainState.NotYourTurn:
				// Callback for NotYourTurn state
				console.log("Entered NotYourTurn state")
				break
			case MainState.YourTurn:
				// Callback for YourTurn state
				switch (state.subState) {
					case SubState.ChoosingLetter:
						console.log("Entered YourTurn-ChoosingLetter state")
						// Callback for ChoosingLetter state
						break
					case SubState.ChoosingCell:
						console.log("Entered YourTurn-ChoosingCell state")
						// Callback for ChoosingCell state
						break
					case SubState.ReadyToPlay:
						console.log("Entered YourTurn-ReadyToPlay state")
						// Callback for ReadyToPlay state
						break
					default:
						break
				}
				break
			default:
				break
		}
	}, [state])

	const toggleState = () => {
		dispatch({
			type: ActionType.ToggleState,
		})
	}

	return (
		<div>
			<h1>Game State Machine</h1>
			<p>Current State: {`${MainState[state.mainState]}-${SubState[state.subState]}`}</p>
			<Button onClick={toggleState}>Toggle State</Button>
			<Button onClick={() => showToast("success")}>Show Toast Success</Button>
			<Button onClick={() => showToast("info")}>Show Toast Success</Button>
			<Button onClick={() => showToast("warning")}>Show Toast Success</Button>
			<Button onClick={() => showToast("error")}>Show Toast Success</Button>
		</div>
	)
}

export default StateMachineComponent2
