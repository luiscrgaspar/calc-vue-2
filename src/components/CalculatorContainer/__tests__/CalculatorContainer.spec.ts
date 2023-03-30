/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount, createLocalVue } from "@vue/test-utils";
import VueI18n from "vue-i18n";
import Vuex from "vuex";
import es from "@/locales/es-ES.json";
import en from "@/locales/en-US.json";
import pt from "@/locales/pt-PT.json";
import CalculatorContainer from "@/components/CalculatorContainer/CalculatorContainer.vue";
import LanguagesContent from "@/components/LanguagesContent/LanguagesContent.vue";
import HeaderContent from "@/components/HeaderContent/HeaderContent.vue";
import CalculatorLineContent from "@/components/CalculatorLineContent/CalculatorLineContent.vue";
import store from "@/store/index";

const localVue = createLocalVue();
localVue.use(VueI18n);
localVue.use(Vuex);

const i18n = new VueI18n({
  locale: "en-US",
  fallbackLocale: "en-US",
  messages: { es, en, pt },
  silentFallbackWarn: true,
});

describe("CalculatorContainer", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(CalculatorContainer, {
      localVue,
      i18n,
      store,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("it renders all the child components", async () => {
    const languagesContentComponent = wrapper.findComponent(LanguagesContent);
    expect(languagesContentComponent.exists()).toBe(true);

    const calculatorContent = wrapper.find(".calculator-content");
    expect(calculatorContent.exists()).toBe(true);

    const headerContentComponent = wrapper.findComponent(HeaderContent);
    expect(headerContentComponent.exists()).toBe(true);

    const calculatorLineContentComponents = wrapper.findAllComponents(
      CalculatorLineContent
    );
    expect(calculatorLineContentComponents.length).toBe(8);

    const calculatorLanguageES = wrapper.find(".calculator-language-ES");
    expect(calculatorLanguageES.exists()).toBe(true);

    calculatorLanguageES.trigger("click");
    await wrapper.vm.$nextTick();
    const calculatorContentHeaderTitle = wrapper.find(
      ".calculator-content-header-title"
    );
    expect(calculatorContentHeaderTitle.text()).toBe("Calculadora");

    const calculatorLanguagePT = wrapper.find(".calculator-language-PT");
    expect(calculatorLanguagePT.exists()).toBe(true);
    calculatorLanguagePT.trigger("click");
    await wrapper.vm.$nextTick();

    expect(calculatorContentHeaderTitle.text()).toBe("Calculadora");

    const calculatorLanguageEN = wrapper.find(".calculator-language-EN");
    expect(calculatorLanguageEN.exists()).toBe(true);
    calculatorLanguageEN.trigger("click");
    await wrapper.vm.$nextTick();

    expect(calculatorContentHeaderTitle.text()).toBe("Calculator");
  });

  test("when we click on one number, after on '+', then on other number and finally on '=', do the addition of these numbers", async () => {
    const number3Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "3");
    expect(number3Button.exists()).toBe(true);

    number3Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("3");

    const plusButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "+");
    expect(plusButton.exists()).toBe(true);

    plusButton.trigger("click");
    await wrapper.vm.$nextTick();

    const number5Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "5");
    expect(number5Button.exists()).toBe(true);

    number5Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5");

    const equalButton = wrapper.find(".calculator-content-line-equal-button");
    expect(equalButton.exists()).toBe(true);

    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("8");
  });

  test("when we click on one number, after on '-', then on other number and finally on '=', do the subtraction of these numbers", async () => {
    const number3Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "3");
    expect(number3Button.exists()).toBe(true);

    number3Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("3");

    const minusButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "-");
    expect(minusButton.exists()).toBe(true);

    minusButton.trigger("click");
    await wrapper.vm.$nextTick();

    const number5Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "5");
    expect(number5Button.exists()).toBe(true);

    number5Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5");

    const equalButton = wrapper.find(".calculator-content-line-equal-button");
    expect(equalButton.exists()).toBe(true);

    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("-2");
  });

  test("when we click on one number, after on 'x', then on other number and finally on '=', do the multiplication of these numbers", async () => {
    const number3Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "3");
    expect(number3Button.exists()).toBe(true);

    number3Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("3");

    const multiplyButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "x");
    expect(multiplyButton.exists()).toBe(true);

    multiplyButton.trigger("click");
    await wrapper.vm.$nextTick();

    const number5Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "5");
    expect(number5Button.exists()).toBe(true);

    number5Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5");

    const equalButton = wrapper.find(".calculator-content-line-equal-button");
    expect(equalButton.exists()).toBe(true);

    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("15");
  });

  test("when we click on one number, after on '÷', then on other number and finally on '=', do the division of these numbers", async () => {
    const number3Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "3");
    expect(number3Button.exists()).toBe(true);

    number3Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("3");

    const divideButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "÷");
    expect(divideButton.exists()).toBe(true);

    divideButton.trigger("click");
    await wrapper.vm.$nextTick();

    const number5Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "5");
    expect(number5Button.exists()).toBe(true);

    number5Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5");

    const equalButton = wrapper.find(".calculator-content-line-equal-button");
    expect(equalButton.exists()).toBe(true);

    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("0.6");
  });

  test("when we click on one number, after on '÷', then on zero and finally on '=', shows 'divided_by_zero' error", async () => {
    const number3Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "3");
    expect(number3Button.exists()).toBe(true);

    number3Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("3");

    const divideButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "÷");
    expect(divideButton.exists()).toBe(true);

    divideButton.trigger("click");
    await wrapper.vm.$nextTick();

    const number0Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "0");
    expect(number0Button.exists()).toBe(true);

    number0Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("0");

    const equalButton = wrapper.find(".calculator-content-line-equal-button");
    expect(equalButton.exists()).toBe(true);

    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("Cannot divide by zero");

    const calculatorLanguageES = wrapper.find(".calculator-language-ES");
    expect(calculatorLanguageES.exists()).toBe(true);
    calculatorLanguageES.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("No se puede dividir por cero");

    const calculatorLanguagePT = wrapper.find(".calculator-language-PT");
    expect(calculatorLanguagePT.exists()).toBe(true);
    calculatorLanguagePT.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("Não é possível dividir por zero");

    const calculatorLanguageEN = wrapper.find(".calculator-language-EN");
    expect(calculatorLanguageEN.exists()).toBe(true);
    calculatorLanguageEN.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("Cannot divide by zero");
  });

  test("when we click on 'π', shows '3.14159265359'", async () => {
    const piButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "π");
    expect(piButton.exists()).toBe(true);

    piButton.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("3.14159265359");
  });

  test("when we click on 'CE', shows '0'", async () => {
    const number3Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "3");
    expect(number3Button.exists()).toBe(true);

    number3Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("3");

    const clearCurrentValueButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "CE");
    expect(clearCurrentValueButton.exists()).toBe(true);

    clearCurrentValueButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("0");
  });

  test("when we click on 'C', shows '0'", async () => {
    const number3Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "3");
    expect(number3Button.exists()).toBe(true);

    number3Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("3");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);

    clearButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("0");
  });

  test("when we insert 12 and click on '<', shows '1' and other click on '<' shows '0'", async () => {
    const number1Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "1");
    expect(number1Button.exists()).toBe(true);

    number1Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("1");

    const number2Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "2");
    expect(number2Button.exists()).toBe(true);

    number2Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("12");

    const backButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "<");
    expect(backButton.exists()).toBe(true);

    backButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("1");

    backButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("0");
  });

  //click on % button
  test("when we click on number and on '+' and then on '%', shows '0.01'", async () => {
    const number1Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "1");
    expect(number1Button.exists()).toBe(true);

    number1Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("1");

    const plusButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "+");
    expect(plusButton.exists()).toBe(true);

    plusButton.trigger("click");
    await wrapper.vm.$nextTick();

    const percentButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "%");
    expect(percentButton.exists()).toBe(true);

    percentButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("0.01");

    const equalButton = wrapper.find(".calculator-content-line-equal-button");
    expect(equalButton.exists()).toBe(true);

    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("1.01");
  });

  test("when we click on number and on 'x²', shows '1'", async () => {
    const number7Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "7");
    expect(number7Button.exists()).toBe(true);

    number7Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("7");

    const squareButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "x²");
    expect(squareButton.exists()).toBe(true);

    squareButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("49");
  });

  test("when we click on number and on 'x³', shows '1'", async () => {
    const number7Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "7");
    expect(number7Button.exists()).toBe(true);

    number7Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("7");

    const cubicButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "x³");
    expect(cubicButton.exists()).toBe(true);

    cubicButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("343");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number and on 'x³' a few times until shows 'infinity' error", async () => {
    const number9Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "9");
    expect(number9Button.exists()).toBe(true);

    number9Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("9");

    const cubicButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "x³");
    expect(cubicButton.exists()).toBe(true);

    cubicButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("729");

    cubicButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("387420489");

    cubicButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5.814974e+25");

    cubicButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("1.966271e+77");

    cubicButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("7.602040e+231");

    cubicButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("Infinity");

    const calculatorLanguageES = wrapper.find(".calculator-language-ES");
    expect(calculatorLanguageES.exists()).toBe(true);

    calculatorLanguageES.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("Infinito");

    const calculatorLanguagePT = wrapper.find(".calculator-language-PT");
    expect(calculatorLanguagePT.exists()).toBe(true);
    calculatorLanguagePT.trigger("click");

    await wrapper.vm.$nextTick();
    expect(resultText.text()).toBe("Infinito");

    const calculatorLanguageEN = wrapper.find(".calculator-language-EN");
    expect(calculatorLanguageEN.exists()).toBe(true);
    calculatorLanguageEN.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("Infinity");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number and on '²√x', shows the result", async () => {
    const number9Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "9");
    expect(number9Button.exists()).toBe(true);

    number9Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("9");

    const squareRootButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "²√x");
    expect(squareRootButton.exists()).toBe(true);

    squareRootButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("3");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number, click on '±' and on '²√x', shows error message", async () => {
    const number9Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "9");
    expect(number9Button.exists()).toBe(true);

    number9Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("9");

    const plusMinusButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "±");
    expect(plusMinusButton.exists()).toBe(true);

    plusMinusButton.trigger("click");
    await wrapper.vm.$nextTick();

    const squareRootButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "²√x");
    expect(squareRootButton.exists()).toBe(true);

    squareRootButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("Invalid number for square root");

    const calculatorLanguageES = wrapper.find(".calculator-language-ES");
    expect(calculatorLanguageES.exists()).toBe(true);

    calculatorLanguageES.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("Número inválido para la raíz cuadrada");

    const calculatorLanguagePT = wrapper.find(".calculator-language-PT");
    expect(calculatorLanguagePT.exists()).toBe(true);
    calculatorLanguagePT.trigger("click");

    await wrapper.vm.$nextTick();
    expect(resultText.text()).toBe("Número inválido para a raiz quadrada");

    const calculatorLanguageEN = wrapper.find(".calculator-language-EN");
    expect(calculatorLanguageEN.exists()).toBe(true);
    calculatorLanguageEN.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("Invalid number for square root");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number and on '³√x', shows the result", async () => {
    const number8Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "8");
    expect(number8Button.exists()).toBe(true);

    number8Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("8");

    const cubicRootButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "³√x");
    expect(cubicRootButton.exists()).toBe(true);

    cubicRootButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("2");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number, click on '±' and on '³√x', shows error message", async () => {
    const number8Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "8");
    expect(number8Button.exists()).toBe(true);

    number8Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("8");

    const plusMinusButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "±");
    expect(plusMinusButton.exists()).toBe(true);

    plusMinusButton.trigger("click");
    await wrapper.vm.$nextTick();

    const cubicRootButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "³√x");
    expect(cubicRootButton.exists()).toBe(true);

    cubicRootButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("Invalid number for cubic root");

    const calculatorLanguageES = wrapper.find(".calculator-language-ES");
    expect(calculatorLanguageES.exists()).toBe(true);

    calculatorLanguageES.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("Número inválido para la raíz cúbica");

    const calculatorLanguagePT = wrapper.find(".calculator-language-PT");
    expect(calculatorLanguagePT.exists()).toBe(true);
    calculatorLanguagePT.trigger("click");

    await wrapper.vm.$nextTick();
    expect(resultText.text()).toBe("Número inválido para a raiz cúbica");

    const calculatorLanguageEN = wrapper.find(".calculator-language-EN");
    expect(calculatorLanguageEN.exists()).toBe(true);
    calculatorLanguageEN.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("Invalid number for cubic root");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number, click on 'n!', shows the result", async () => {
    const number8Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "8");
    expect(number8Button.exists()).toBe(true);

    number8Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("8");

    const factorialButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "n!");
    expect(factorialButton.exists()).toBe(true);

    factorialButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("40320");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number, click on '1/x', shows the result", async () => {
    const number2Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "2");
    expect(number2Button.exists()).toBe(true);

    number2Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("2");

    const oneDividedByXButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "1/x");
    expect(oneDividedByXButton.exists()).toBe(true);

    oneDividedByXButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("0.5");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on 'e', shows '2.71828182846'", async () => {
    const eButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "e");
    expect(eButton.exists()).toBe(true);

    eButton.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("2.71828182846");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number and click on '±', shows negative number, and other click on '±' shows positive number", async () => {
    const number2Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "2");
    expect(number2Button.exists()).toBe(true);

    number2Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("2");

    const plusMinusButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "±");
    expect(plusMinusButton.exists()).toBe(true);

    plusMinusButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("-2");

    plusMinusButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("2");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on zero if result is already zero, dont change result", async () => {
    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("0");

    const number0Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "0");
    expect(number0Button.exists()).toBe(true);

    number0Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("0");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on zero if result is not zero, change result", async () => {
    const number1Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "1");
    expect(number1Button.exists()).toBe(true);

    number1Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("1");

    const number0Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "0");
    expect(number0Button.exists()).toBe(true);

    number0Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("10");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number and click on '.', should add point to result, and if we click on another number and click on '.', doesn't change the result", async () => {
    const number1Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "1");
    expect(number1Button.exists()).toBe(true);

    number1Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("1");

    const decimalPointButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === ".");
    expect(decimalPointButton.exists()).toBe(true);

    decimalPointButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("1.");

    const number0Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "0");
    expect(number0Button.exists()).toBe(true);

    number0Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("1.0");

    decimalPointButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("1.0");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number, click on '+', click on other number and finally click on '=' a few times, should change the result every time we click on '='", async () => {
    const number5Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "5");
    expect(number5Button.exists()).toBe(true);

    number5Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("5");

    const plusButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "+");
    expect(plusButton.exists()).toBe(true);

    plusButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5");

    const number7Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "7");
    expect(number7Button.exists()).toBe(true);

    number7Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("7");

    const equalButton = wrapper.find(".calculator-content-line-equal-button");
    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("12");

    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("19");

    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("26");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number, click on '-', click on other number and finally click on '=' a few times, should change the result every time we click on '='", async () => {
    const number5Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "5");
    expect(number5Button.exists()).toBe(true);

    number5Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("5");

    const minusButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "-");
    expect(minusButton.exists()).toBe(true);

    minusButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5");

    const number7Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "7");
    expect(number7Button.exists()).toBe(true);

    number7Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("7");

    const equalButton = wrapper.find(".calculator-content-line-equal-button");
    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("-2");

    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("-9");

    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("-16");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number, click on 'x', click on other number and finally click on '=' a few times, should change the result every time we click on '='", async () => {
    const number5Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "5");
    expect(number5Button.exists()).toBe(true);

    number5Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("5");

    const multiplicationButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "x");
    expect(multiplicationButton.exists()).toBe(true);

    multiplicationButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5");

    const number7Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "7");
    expect(number7Button.exists()).toBe(true);

    number7Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("7");

    const equalButton = wrapper.find(".calculator-content-line-equal-button");
    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("35");

    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("245");

    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("1715");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number, click on '÷', click on other number and finally click on '=' a few times, should change the result every time we click on '='", async () => {
    const number5Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "5");
    expect(number5Button.exists()).toBe(true);

    number5Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("5");

    const multiplicationButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "÷");
    expect(multiplicationButton.exists()).toBe(true);

    multiplicationButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5");

    const number7Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "7");
    expect(number7Button.exists()).toBe(true);

    number7Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("7");

    const equalButton = wrapper.find(".calculator-content-line-equal-button");
    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("0.71428571429");

    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("0.10204081633");

    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("0.01457725948");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number, click on '+', click on other number and finally click on '+' and on '=', should change the result", async () => {
    const number5Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "5");
    expect(number5Button.exists()).toBe(true);

    number5Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("5");

    const plusButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "+");
    expect(plusButton.exists()).toBe(true);

    plusButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5");

    const number7Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "7");
    expect(number7Button.exists()).toBe(true);

    number7Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("7");

    plusButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("12");

    const equalButton = wrapper.find(".calculator-content-line-equal-button");
    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("24");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number, click on '-', click on other number and finally click on '-' and on '=', should change the result", async () => {
    const number5Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "5");
    expect(number5Button.exists()).toBe(true);

    number5Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("5");

    const minusButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "-");
    expect(minusButton.exists()).toBe(true);

    minusButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5");

    const number7Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "7");
    expect(number7Button.exists()).toBe(true);

    number7Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("7");

    minusButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("-2");

    const equalButton = wrapper.find(".calculator-content-line-equal-button");
    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("0");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number, click on 'x', click on other number and finally click on 'x' and on '=', should change the result", async () => {
    const number5Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "5");
    expect(number5Button.exists()).toBe(true);

    number5Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("5");

    const multiplicationButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "x");
    expect(multiplicationButton.exists()).toBe(true);

    multiplicationButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5");

    const number7Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "7");
    expect(number7Button.exists()).toBe(true);

    number7Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("7");

    multiplicationButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("35");

    const equalButton = wrapper.find(".calculator-content-line-equal-button");
    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("1225");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number, click on '÷', click on other number and finally click on '÷' and on '=', should change the result", async () => {
    const number5Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "5");
    expect(number5Button.exists()).toBe(true);

    number5Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("5");

    const divideButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "÷");
    expect(divideButton.exists()).toBe(true);

    divideButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5");

    const number7Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "7");
    expect(number7Button.exists()).toBe(true);

    number7Button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("7");

    divideButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("0.71428571429");

    const equalButton = wrapper.find(".calculator-content-line-equal-button");
    equalButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("1");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
  });

  test("when we click on number and click on 'MS', click on 'C' and click on 'MR', and finally click on 'MC', should had the correct behaviour", async () => {
    const number5Button = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "5");
    expect(number5Button.exists()).toBe(true);

    number5Button.trigger("click");
    await wrapper.vm.$nextTick();

    const resultText = wrapper.find(".calculator-content-header-result-text");
    expect(resultText.text()).toBe("5");

    const memorySaveButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "MS");
    expect(memorySaveButton.exists()).toBe(true);

    memorySaveButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5");

    const clearButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "C");
    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("0");

    const memoryRecoveryButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "MR");
    expect(memoryRecoveryButton.exists()).toBe(true);

    memoryRecoveryButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(resultText.text()).toBe("5");

    const memoryCleanButton = wrapper
      .findAll(".calculator-content-line-normal-button")
      .filter((lineButton: any) => lineButton.text() === "MC");
    expect(memoryCleanButton.exists()).toBe(true);

    memoryCleanButton.trigger("click");
    expect(resultText.text()).toBe("5");

    expect(clearButton.exists()).toBe(true);
    clearButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(memoryRecoveryButton.at(0).attributes("disabled")).toBe("disabled");
    expect(memoryCleanButton.at(0).attributes("disabled")).toBe("disabled");
  });
});
