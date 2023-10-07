import React, { useReducer } from "react"

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
const StateMachineComponent: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const toggleState = () => {
		dispatch({
			type: ActionType.ToggleState,
		})
	}

	return (
		<div>
			<h1>Game State Machine</h1>
			<p>Current State: {`${MainState[state.mainState]}-${SubState[state.subState]}`}</p>
			<button onClick={toggleState}>Toggle State</button>
		</div>
	)
}

export default StateMachineComponent
