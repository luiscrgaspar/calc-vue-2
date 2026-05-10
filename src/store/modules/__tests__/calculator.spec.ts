/* eslint-disable @typescript-eslint/no-explicit-any */
import calculator from "@/store/modules/calculator";
import { Language } from "@/types/Calculator";

interface IState {
  languages: Language[];
  currentValue: string;
  currentTemporaryValue: string;
  currentMemoryValue: string;
  currentResult: string;
  currentOperator: string;
  goingToDoOperation: boolean;
  isInfinity: boolean;
  alreadyDoneEqualOperation: boolean;
  error: string;
}

type CalculatorPayload = string | boolean;
type CalculatorCommit = (mutation: string, payload: CalculatorPayload) => void;

interface CalculatorModule {
  state: IState;
  getters: Record<string, (state: IState) => unknown>;
  mutations: Record<string, (state: IState, payload: any) => void>;
  actions: Record<string, (context: { commit: CalculatorCommit }, payload: any) => void>;
}

const calculatorModule = calculator as CalculatorModule;

function createState(overrides: Partial<IState> = {}): IState {
  return {
    ...JSON.parse(JSON.stringify(calculatorModule.state)),
    ...overrides,
  };
}

describe("calculator store module", () => {
  describe("initial state", () => {
    test("has the expected default values", () => {
      const state = createState();
      expect(state.currentValue).toBe("0");
      expect(state.currentTemporaryValue).toBe("");
      expect(state.currentMemoryValue).toBe("");
      expect(state.currentResult).toBe("");
      expect(state.currentOperator).toBe("");
      expect(state.goingToDoOperation).toBe(false);
      expect(state.isInfinity).toBe(false);
      expect(state.alreadyDoneEqualOperation).toBe(false);
      expect(state.error).toBe("");
    });

    test("initializes with en-US as the active language", () => {
      const state = createState();
      expect(state.languages).toEqual([
        { key: "en-US", label: "EN", active: true },
        { key: "es-ES", label: "ES", active: false },
        { key: "pt-PT", label: "PT", active: false },
      ]);
    });
  });

  describe("getters", () => {
    test("expose all calculator state properties", () => {
      const state = createState({
        currentValue: "12",
        currentTemporaryValue: "7",
        currentMemoryValue: "5",
        currentOperator: "+",
        goingToDoOperation: true,
        currentResult: "19",
        isInfinity: true,
        alreadyDoneEqualOperation: true,
        error: "divided_by_zero",
      });

      expect(calculatorModule.getters.languages(state)).toEqual(state.languages);
      expect(calculatorModule.getters.currentValue(state)).toBe("12");
      expect(calculatorModule.getters.currentTemporaryValue(state)).toBe("7");
      expect(calculatorModule.getters.currentMemoryValue(state)).toBe("5");
      expect(calculatorModule.getters.currentOperator(state)).toBe("+");
      expect(calculatorModule.getters.goingToDoOperation(state)).toBe(true);
      expect(calculatorModule.getters.currentResult(state)).toBe("19");
      expect(calculatorModule.getters.isInfinity(state)).toBe(true);
      expect(calculatorModule.getters.alreadyDoneEqualOperation(state)).toBe(true);
      expect(calculatorModule.getters.error(state)).toBe("divided_by_zero");
    });

    test("languages getter returns the languages array", () => {
      const state = createState();
      const languages = calculatorModule.getters.languages(state) as Language[];
      expect(languages).toHaveLength(3);
      expect(languages[0].key).toBe("en-US");
      expect(languages[1].key).toBe("es-ES");
      expect(languages[2].key).toBe("pt-PT");
    });
  });

  describe("mutations", () => {
    describe("setCurrentLanguage", () => {
      test("activates the requested language and deactivates others", () => {
        const state = createState();
        calculatorModule.mutations.setCurrentLanguage(state, "pt-PT");
        expect(state.languages).toEqual([
          { key: "en-US", label: "EN", active: false },
          { key: "es-ES", label: "ES", active: false },
          { key: "pt-PT", label: "PT", active: true },
        ]);
      });

      test("switches from one active language to another", () => {
        const state = createState();
        calculatorModule.mutations.setCurrentLanguage(state, "es-ES");
        expect(state.languages).toEqual([
          { key: "en-US", label: "EN", active: false },
          { key: "es-ES", label: "ES", active: true },
          { key: "pt-PT", label: "PT", active: false },
        ]);
      });

      test("can reactivate en-US after switching", () => {
        const state = createState();
        calculatorModule.mutations.setCurrentLanguage(state, "pt-PT");
        calculatorModule.mutations.setCurrentLanguage(state, "en-US");
        expect(state.languages).toEqual([
          { key: "en-US", label: "EN", active: true },
          { key: "es-ES", label: "ES", active: false },
          { key: "pt-PT", label: "PT", active: false },
        ]);
      });
    });

    describe("addToCurrentValue", () => {
      test("replaces the display when goingToDoOperation is true and payload is a digit", () => {
        const state = createState({ currentValue: "8", goingToDoOperation: true });
        calculatorModule.mutations.addToCurrentValue(state, "3");
        expect(state.currentValue).toBe("3");
        expect(state.goingToDoOperation).toBe(false);
      });

      test("starts a decimal value after selecting an operator", () => {
        const state = createState({ currentValue: "8", goingToDoOperation: true });
        calculatorModule.mutations.addToCurrentValue(state, ".");
        expect(state.currentValue).toBe("0.");
        expect(state.goingToDoOperation).toBe(false);
      });

      test("replaces zero with a new digit", () => {
        const state = createState({ currentValue: "0" });
        calculatorModule.mutations.addToCurrentValue(state, "5");
        expect(state.currentValue).toBe("5");
      });

      test("appends a digit to a non-zero value", () => {
        const state = createState({ currentValue: "12" });
        calculatorModule.mutations.addToCurrentValue(state, "3");
        expect(state.currentValue).toBe("123");
      });

      test("appends a decimal point to a value", () => {
        const state = createState({ currentValue: "5" });
        calculatorModule.mutations.addToCurrentValue(state, ".");
        expect(state.currentValue).toBe("5.");
      });
    });

    describe("setCurrentValue", () => {
      test("sets the current value to a string", () => {
        const state = createState();
        calculatorModule.mutations.setCurrentValue(state, "42");
        expect(state.currentValue).toBe("42");
      });

      test("sets the current value to zero string", () => {
        const state = createState({ currentValue: "99" });
        calculatorModule.mutations.setCurrentValue(state, "0");
        expect(state.currentValue).toBe("0");
      });
    });

    describe("setCurrentTemporaryValue", () => {
      test("sets the temporary value", () => {
        const state = createState();
        calculatorModule.mutations.setCurrentTemporaryValue(state, "21");
        expect(state.currentTemporaryValue).toBe("21");
      });

      test("can clear the temporary value", () => {
        const state = createState({ currentTemporaryValue: "5" });
        calculatorModule.mutations.setCurrentTemporaryValue(state, "");
        expect(state.currentTemporaryValue).toBe("");
      });
    });

    describe("setCurrentMemoryValue", () => {
      test("stores a value in memory", () => {
        const state = createState();
        calculatorModule.mutations.setCurrentMemoryValue(state, "5");
        expect(state.currentMemoryValue).toBe("5");
      });

      test("clears memory when set to empty string", () => {
        const state = createState({ currentMemoryValue: "100" });
        calculatorModule.mutations.setCurrentMemoryValue(state, "");
        expect(state.currentMemoryValue).toBe("");
      });
    });

    describe("setCurrentOperator", () => {
      test("sets the operator", () => {
        const state = createState();
        calculatorModule.mutations.setCurrentOperator(state, "/");
        expect(state.currentOperator).toBe("/");
      });

      test("clears the operator when set to empty string", () => {
        const state = createState({ currentOperator: "+" });
        calculatorModule.mutations.setCurrentOperator(state, "");
        expect(state.currentOperator).toBe("");
      });
    });

    describe("setGoingToDoOperation", () => {
      test("sets goingToDoOperation to true", () => {
        const state = createState();
        calculatorModule.mutations.setGoingToDoOperation(state, true);
        expect(state.goingToDoOperation).toBe(true);
      });

      test("sets goingToDoOperation to false", () => {
        const state = createState({ goingToDoOperation: true });
        calculatorModule.mutations.setGoingToDoOperation(state, false);
        expect(state.goingToDoOperation).toBe(false);
      });
    });

    describe("setCurrentResult", () => {
      test("sets the current result", () => {
        const state = createState();
        calculatorModule.mutations.setCurrentResult(state, "2");
        expect(state.currentResult).toBe("2");
      });

      test("clears the current result", () => {
        const state = createState({ currentResult: "10" });
        calculatorModule.mutations.setCurrentResult(state, "");
        expect(state.currentResult).toBe("");
      });
    });

    describe("setIsInfinity", () => {
      test("sets isInfinity to true", () => {
        const state = createState();
        calculatorModule.mutations.setIsInfinity(state, true);
        expect(state.isInfinity).toBe(true);
      });

      test("sets isInfinity to false", () => {
        const state = createState({ isInfinity: true });
        calculatorModule.mutations.setIsInfinity(state, false);
        expect(state.isInfinity).toBe(false);
      });
    });

    describe("setAlreadyDoneEqualOperation", () => {
      test("sets alreadyDoneEqualOperation to true", () => {
        const state = createState();
        calculatorModule.mutations.setAlreadyDoneEqualOperation(state, true);
        expect(state.alreadyDoneEqualOperation).toBe(true);
      });

      test("sets alreadyDoneEqualOperation to false", () => {
        const state = createState({ alreadyDoneEqualOperation: true });
        calculatorModule.mutations.setAlreadyDoneEqualOperation(state, false);
        expect(state.alreadyDoneEqualOperation).toBe(false);
      });
    });

    describe("setError", () => {
      test("sets the error key", () => {
        const state = createState();
        calculatorModule.mutations.setError(state, "divided_by_zero");
        expect(state.error).toBe("divided_by_zero");
      });

      test("clears the error", () => {
        const state = createState({ error: "divided_by_zero" });
        calculatorModule.mutations.setError(state, "");
        expect(state.error).toBe("");
      });

      test("sets invalid_number_for_square_root error", () => {
        const state = createState();
        calculatorModule.mutations.setError(state, "invalid_number_for_square_root");
        expect(state.error).toBe("invalid_number_for_square_root");
      });

      test("sets invalid_number_for_cubic_root error", () => {
        const state = createState();
        calculatorModule.mutations.setError(state, "invalid_number_for_cubic_root");
        expect(state.error).toBe("invalid_number_for_cubic_root");
      });
    });
  });

  describe("actions", () => {
    test("each action commits its matching mutation", () => {
      const commit = jest.fn();
      const context = { commit };

      calculatorModule.actions.setCurrentLanguage(context, "es-ES");
      calculatorModule.actions.addToCurrentValue(context, "9");
      calculatorModule.actions.setCurrentValue(context, "8");
      calculatorModule.actions.setCurrentTemporaryValue(context, "7");
      calculatorModule.actions.setCurrentMemoryValue(context, "6");
      calculatorModule.actions.setCurrentOperator(context, "+");
      calculatorModule.actions.setGoingToDoOperation(context, true);
      calculatorModule.actions.setCurrentResult(context, "15");
      calculatorModule.actions.setIsInfinity(context, true);
      calculatorModule.actions.setAlreadyDoneEqualOperation(context, true);
      calculatorModule.actions.setError(context, "divided_by_zero");

      expect(commit.mock.calls).toEqual([
        ["setCurrentLanguage", "es-ES"],
        ["addToCurrentValue", "9"],
        ["setCurrentValue", "8"],
        ["setCurrentTemporaryValue", "7"],
        ["setCurrentMemoryValue", "6"],
        ["setCurrentOperator", "+"],
        ["setGoingToDoOperation", true],
        ["setCurrentResult", "15"],
        ["setIsInfinity", true],
        ["setAlreadyDoneEqualOperation", true],
        ["setError", "divided_by_zero"],
      ]);
    });

    test("setCurrentLanguage dispatches setCurrentLanguage commit", () => {
      const commit = jest.fn();
      calculatorModule.actions.setCurrentLanguage({ commit }, "pt-PT");
      expect(commit).toHaveBeenCalledWith("setCurrentLanguage", "pt-PT");
    });

    test("addToCurrentValue dispatches addToCurrentValue commit", () => {
      const commit = jest.fn();
      calculatorModule.actions.addToCurrentValue({ commit }, "5");
      expect(commit).toHaveBeenCalledWith("addToCurrentValue", "5");
    });

    test("setIsInfinity dispatches setIsInfinity commit with false", () => {
      const commit = jest.fn();
      calculatorModule.actions.setIsInfinity({ commit }, false);
      expect(commit).toHaveBeenCalledWith("setIsInfinity", false);
    });

    test("setGoingToDoOperation dispatches commit with boolean payload", () => {
      const commit = jest.fn();
      calculatorModule.actions.setGoingToDoOperation({ commit }, false);
      expect(commit).toHaveBeenCalledWith("setGoingToDoOperation", false);
    });
  });
});
