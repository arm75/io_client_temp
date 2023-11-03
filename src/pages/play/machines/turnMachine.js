import { createMachine } from 'xstate';

const turnMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBUCqAlAcgAgLIEEBhACQElMBRAOkwHlkB9NLAYmQEMBrMbZAVwBOAOwDaABgC6iUAAcA9rACWAF0Vyh0kAA9EAWgAsAVkNUAbAGZ9ATisAmABznTAdiPnnAGhABPPQEY-WyoxZxtzWz9DZ0NrP30AX3ivZhwCEnJqFKoSWloAZXIAcQYAdVp0ABEWQgALOQUeErkBCHEpJBB5JVV1TR0EXUM-Kis-Zwi-K1NTW1N9Z3svXwGAsSo-U0jbefs7cyn7ROSMVKIySiosnPyi0vKqgAV2WFheQVFJTS6VNQ0O-t0tnMwxm5nsRis+n0YlsYnmS389lMVAcjmBYjEcyM9lsRxAKTwZwylxO2WIuQKmGKDxuyFItEw1XYQgAxmAADZtL4KH69f56BzrZzuWy2QxOSIbUyGBErJEo+xovwYrGGHF4glpc6ZUnXSnU2n0xm1eqwHgPHk9D7tWSW359RCWIJicLowy2cbOEL6WW6AImDZbfTheZiQ5JfEnQnpC5ZdAUfAVACaTFoDAeABl8EmmayOVyOt8rQ6EO4TLtbDYYuEYYZIb6-PLUeZ0ZioWrcRHNUTY6T44mU8g05nsywHuz2N4C7buvb+Qg1Ws7H4wVYXfNRqYG03FS3lW3sZ2I0I5BA4JpuzGKNzZ3zQAChlYRpihg5JWLFj49PpYcE5rsrGMexIlMDUoy1Yk6EYFIb15P572-ZxhjXaVAmA181V9FsglcSYFnsJDJmBMCsGjbUSSwWDi3nQF5WhFtzDERsMRXaVfQ9cwzACMUNisSww2cEjTivCjMDJClbjKSoqLnBCBiBewqHolsmPsFinBlL8VkCJTG30CwXEcAJNiEsjiSuckbipdNDQZGS720RBjKUpiJVFVj3B9LS-UiKhDAxTFlVGewhlCUyIN7LAqH7ZNU3TLMk3s+DHIXJwqHCfzojiGF5lsBtfP8lUgsbUKrESRIgA */
  id: "TURN MACHINE",

  states: {
    NOT_TURN: {
      on: {
        "Take Turn": "TURN.CHOOSING_WORD"
      }
    },

    TURN: {
      states: {
        CHOOSING_WORD: {
          on: {
            "Choose Word": "CHOOSING_POSITION",
            "Pass Turn": "#TURN MACHINE.NOT_TURN"
          }
        },

        CHOOSING_POSITION: {
          on: {
            Cancel: "CHOOSING_WORD",
            "Choose Position": "READY_TO_PLAY"
          }
        },

        READY_TO_PLAY: {
          on: {
            Cancel: "CHOOSING_POSITION",
            Play: "#TURN MACHINE.NOT_TURN"
          }
        }
      },

      initial: "CHOOSING_WORD"
    }
  },

  initial: "NOT_TURN"
})

export default turnMachine
