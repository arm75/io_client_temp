import { createMachine } from "xstate"

const turnMachine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5QBUCqAlAcgAgLIEEBhACQElMBRAOkwHlkB9NLAYmQEMBrMbZAVwBOAOwDaABgC6iUAAcA9rACWAF0Vyh0kAA9EAVgDsVAJwAWAEwAOAIwmxuo2NsBmADQgAnoidXDTp0ZtdXTN9H399AF8It2YcAhJyaliqElpaAGVyAHEGAHVadAARFkIACzkFHly5AQhxKSQQeSVVdU0dBF0TK2MTfSMzQaGnC103TwRzHqcANhN7SxnQvpMomIw4ojJKKmTUjOyGAAUD5FJaTBL2IQBjMAAbes1mlTUNRo6gnssLCyWupz6WZmcaISyGJZmJxiGZGGZifyWNYgWJ4LaJXYbFLENKZTA5E6ZM4XErlSrYI4KV7qJ6NF6td6gDoDHp-IwWBEmeEzGa6KygyZQqh-eYDP7LfSraIojZohI7ZLoCj4QoATSYtGOABl8KqrrcHrTZFSGe1EEYRlQxOzdBYzHzfgYLALwVRIdDYfDEfpdMjUfFtkksUqVerkJqjjq9Ud7ux3Eamia3maEFZvCYqN59PoLJKxPnTCYBd0LFRLGYjA4rHY-l1fdL-eiFVjSIUtRQWEd2LBYLxBKJJM8k20PogrAFjIMFmYuZKBiCPGOnBmgkZdGJx5XeSEzH7ZQGMclW+2WLguDwY3GE-Tk6OEE57FQgt5AePurpea5F5Mc1QTOzYVFSxrQsPcsDlQNMSwbFcUOfIin1O5HkHOlh0ZbQvGsN0Z1sEwLD6HlfhdXM3X0KEQmrF84SiaUhDkCA4E0Rt5QoIcWlvJlzV6SwbDsBxnDEBcJgAWhmTMRiCfQZisDl8PhSIG33JtqDoRhYjY6l0I6B9S1mHwQg5IIxAsL8Jg5Yx8NmGEtwsOEZjAzYWKgzANNNO8bFLdcFiCWc7XZF180zf9AXzYK0xmUDFPAg9m2g-Y8RyeDClcjiMPvPpM3tXQ-GXGwTBMUzMLMMtAXwuyOQK+t1mi5TnJgg58WOU5zhc1D2JHTiEH0RwnxMgYPwGHNumLGS-3ygrITMa0qplGqnMVZU1Q1bVdRSjq0qsatisWdd5jsfpnW-Esxvy2YyKmtcHIgw8WzbVi2s0lNxzErz+q6JY-MOiZAQzUYyOsEy-ArGiIiAA */
		id: "TURN MACHINE",
		predictableActionArguments: true,
		states: {
			NOT_TURN: {
				states: {
					IDLE: {
						on: {
							"Take Turn": "#TURN MACHINE.TURN.IDLE",
						},
					},
				},
				initial: "IDLE",
				// on: {
				// 	"Take Turn": "TURN.IDLE",
				// },
			},

			TURN: {
				states: {
					CHOOSING_WORD: {
						on: {
							Cancel: "IDLE",
							"Choose Word": "CHOOSING_POSITION",
						},
						// entry: () => {
						// 	alert("hello")
						// },
						// exit: { type: "alertMe" },
					},

					CHOOSING_POSITION: {
						on: {
							Cancel: "CHOOSING_WORD",
							"Choose Position": "READY_TO_PLAY",
						},
					},

					READY_TO_PLAY: {
						on: {
							Cancel: "CHOOSING_POSITION",
							Play: "#TURN MACHINE.NOT_TURN",
						},
					},

					IDLE: {
						on: {
							"Pass Turn": "#TURN MACHINE.NOT_TURN.IDLE",
							"Make Play": "CHOOSING_WORD",
						},
					},
				},

				initial: "IDLE",
			},
		},

		initial: "NOT_TURN",
	},
	{
		actions: {
			alertMe: () => {
				alert("This is a Test action")
			},
		},
	}
)
export default turnMachine
