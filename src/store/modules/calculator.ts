import { Language } from "../../types/Calculator";

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

interface IContext {
  commit: (action: string, payload: string | boolean) => void;
}

const state: IState = {
  languages: [
    {
      key: "en-US",
      label: "EN",
      active: true,
    },
    {
      key: "es-ES",
      label: "ES",
      active: false,
    },
    {
      key: "pt-PT",
      label: "PT",
      active: false,
    },
  ],
  currentValue: "0",
  currentTemporaryValue: "",
  currentMemoryValue: "",
  currentResult: "",
  currentOperator: "",
  goingToDoOperation: false,
  isInfinity: false,
  alreadyDoneEqualOperation: false,
  error: "",
};

const getters = {
  languages: (state: IState): Language[] => state.languages,
  currentValue: (state: IState): string => state.currentValue,
  currentTemporaryValue: (state: IState): string => state.currentTemporaryValue,
  currentMemoryValue: (state: IState): string => state.currentMemoryValue,
  currentOperator: (state: IState): string => state.currentOperator,
  goingToDoOperation: (state: IState): boolean => state.goingToDoOperation,
  currentResult: (state: IState): string => state.currentResult,
  isInfinity: (state: IState): boolean => state.isInfinity,
  alreadyDoneEqualOperation: (state: IState): boolean => state.alreadyDoneEqualOperation,
  error: (state: IState): string => state.error,
};

const mutations = {
  setCurrentLanguage(state: IState, payload: string): void {
    const newLanguages: Language[] = [];
    state.languages.forEach((lang) => {
      newLanguages.push({ ...lang, active: lang.key === payload });
    });
    state.languages = [...newLanguages];
  },
  addToCurrentValue(state: IState, payload: string): void {
    if (payload === "." && state.goingToDoOperation) {
      state.goingToDoOperation = false;
      state.currentValue = "0.";
      return;
    }

    state.currentValue =
      (state.currentValue === "0" && payload !== ".") ||
      state.goingToDoOperation
        ? payload
        : state.currentValue.toString() + payload;

    if (state.goingToDoOperation) state.goingToDoOperation = false;
  },
  setCurrentValue(state: IState, payload: string): void {
    state.currentValue = payload;
  },
  setCurrentTemporaryValue(state: IState, payload: string): void {
    state.currentTemporaryValue = payload;
  },
  setCurrentMemoryValue(state: IState, payload: string): void {
    state.currentMemoryValue = payload;
  },
  setCurrentOperator(state: IState, payload: string): void {
    state.currentOperator = payload;
  },
  setGoingToDoOperation(state: IState, payload: boolean): void {
    state.goingToDoOperation = payload;
  },
  setCurrentResult(state: IState, payload: string): void {
    state.currentResult = payload;
  },
  setIsInfinity(state: IState, payload: boolean): void {
    state.isInfinity = payload;
  },
  setAlreadyDoneEqualOperation(state: IState, payload: boolean): void {
    state.alreadyDoneEqualOperation = payload;
  },
  setError(state: IState, payload: string): void {
    state.error = payload;
  },
};

const actions = {
  setCurrentLanguage(context: IContext, payload: string): void {
    context.commit("setCurrentLanguage", payload);
  },
  addToCurrentValue(context: IContext, payload: string): void {
    context.commit("addToCurrentValue", payload);
  },
  setCurrentValue(context: IContext, payload: string): void {
    context.commit("setCurrentValue", payload);
  },
  setCurrentTemporaryValue(context: IContext, payload: string): void {
    context.commit("setCurrentTemporaryValue", payload);
  },
  setCurrentMemoryValue(context: IContext, payload: string): void {
    context.commit("setCurrentMemoryValue", payload);
  },
  setCurrentOperator(context: IContext, payload: string): void {
    context.commit("setCurrentOperator", payload);
  },
  setGoingToDoOperation(context: IContext, payload: boolean): void {
    context.commit("setGoingToDoOperation", payload);
  },
  setCurrentResult(context: IContext, payload: string): void {
    context.commit("setCurrentResult", payload);
  },
  setIsInfinity(context: IContext, payload: boolean): void {
    context.commit("setIsInfinity", payload);
  },
  setAlreadyDoneEqualOperation(context: IContext, payload: boolean): void {
    context.commit("setAlreadyDoneEqualOperation", payload);
  },
  setError(context: IContext, payload: boolean): void {
    context.commit("setError", payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
