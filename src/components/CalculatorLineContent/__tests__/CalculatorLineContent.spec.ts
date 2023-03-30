/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueI18n from "vue-i18n";
import Vuex from "vuex";
import es from "@/locales/es-ES.json";
import en from "@/locales/en-US.json";
import pt from "@/locales/pt-PT.json";
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

describe("CalculatorLineContent", () => {
  test("it renders the content of first line of the calculator", async () => {
    const wrapper = shallowMount(CalculatorLineContent, {
      localVue,
      i18n,
      store,
      propsData: { icons: ["π", "CE", "C", "<"] },
    });

    const calculatorContentLine = wrapper.find(".calculator-content-line");
    expect(calculatorContentLine.exists()).toBe(true);

    const calculatorContentLineNormalButtons = wrapper.findAll(
      ".calculator-content-line-normal-button"
    );
    expect(calculatorContentLineNormalButtons.length).toBe(4);
    expect(
      calculatorContentLineNormalButtons.at(0).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(0).text()).toBe("π");
    calculatorContentLineNormalButtons.at(0).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler1")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(1).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(1).text()).toBe("CE");
    calculatorContentLineNormalButtons.at(1).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler2")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(2).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(2).text()).toBe("C");
    calculatorContentLineNormalButtons.at(2).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler3")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(3).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(3).text()).toBe("<");
    calculatorContentLineNormalButtons.at(3).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler4")).toBeTruthy();
  });

  test("it renders the content of second line of the calculator", async () => {
    const wrapper = shallowMount(CalculatorLineContent, {
      localVue,
      i18n,
      store,
      propsData: {
        icons: ["MC", "MR", "MS", "%"],
        disabledButtons: [true, true, false, false],
      },
    });

    const calculatorContentLine = wrapper.find(".calculator-content-line");
    expect(calculatorContentLine.exists()).toBe(true);

    const calculatorContentLineNormalButtons = wrapper.findAll(
      ".calculator-content-line-normal-button"
    );
    expect(calculatorContentLineNormalButtons.length).toBe(4);
    expect(
      calculatorContentLineNormalButtons.at(0).attributes("disabled")
    ).toBe("disabled");
    expect(calculatorContentLineNormalButtons.at(0).text()).toBe("MC");
    calculatorContentLineNormalButtons.at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler1")).toBeFalsy();

    expect(
      calculatorContentLineNormalButtons.at(1).attributes("disabled")
    ).toBe("disabled");
    expect(calculatorContentLineNormalButtons.at(1).text()).toBe("MR");
    calculatorContentLineNormalButtons.at(1).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler2")).toBeFalsy();

    expect(
      calculatorContentLineNormalButtons.at(2).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(2).text()).toBe("MS");
    calculatorContentLineNormalButtons.at(2).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler3")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(3).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(3).text()).toBe("%");
    calculatorContentLineNormalButtons.at(3).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler4")).toBeTruthy();
  });

  test("it renders the content of third line of the calculator", async () => {
    const wrapper = shallowMount(CalculatorLineContent, {
      localVue,
      i18n,
      store,
      propsData: { icons: ["x²", "x³", "²√x", "³√x"] },
    });

    const calculatorContentLine = wrapper.find(".calculator-content-line");
    expect(calculatorContentLine.exists()).toBe(true);

    const calculatorContentLineNormalButtons = wrapper.findAll(
      ".calculator-content-line-normal-button"
    );
    expect(calculatorContentLineNormalButtons.length).toBe(4);
    expect(
      calculatorContentLineNormalButtons.at(0).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(0).text()).toBe("x²");
    calculatorContentLineNormalButtons.at(0).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler1")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(1).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(1).text()).toBe("x³");
    calculatorContentLineNormalButtons.at(1).trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler2")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(2).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(2).text()).toBe("²√x");
    calculatorContentLineNormalButtons.at(2).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler3")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(3).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(3).text()).toBe("³√x");
    calculatorContentLineNormalButtons.at(3).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler4")).toBeTruthy();
  });

  test("it renders the content of fourth line of the calculator", async () => {
    const wrapper = shallowMount(CalculatorLineContent, {
      localVue,
      i18n,
      store,
      propsData: { icons: ["n!", "1/x", "e", "÷"] },
    });

    const calculatorContentLine = wrapper.find(".calculator-content-line");
    expect(calculatorContentLine.exists()).toBe(true);

    const calculatorContentLineNormalButtons = wrapper.findAll(
      ".calculator-content-line-normal-button"
    );
    expect(calculatorContentLineNormalButtons.length).toBe(4);
    expect(
      calculatorContentLineNormalButtons.at(0).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(0).text()).toBe("n!");
    calculatorContentLineNormalButtons.at(0).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler1")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(1).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(1).text()).toBe("1/x");
    calculatorContentLineNormalButtons.at(1).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler2")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(2).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(2).text()).toBe("e");
    calculatorContentLineNormalButtons.at(2).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler3")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(3).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(3).text()).toBe("÷");
    calculatorContentLineNormalButtons.at(3).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler4")).toBeTruthy();
  });

  test("it renders the content of fifth line of the calculator", async () => {
    const wrapper = shallowMount(CalculatorLineContent, {
      localVue,
      i18n,
      store,
      propsData: { icons: ["7", "8", "9", "x"] },
    });

    const calculatorContentLine = wrapper.find(".calculator-content-line");
    expect(calculatorContentLine.exists()).toBe(true);

    const calculatorContentLineNormalButtons = wrapper.findAll(
      ".calculator-content-line-normal-button"
    );
    expect(calculatorContentLineNormalButtons.length).toBe(4);
    expect(
      calculatorContentLineNormalButtons.at(0).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(0).text()).toBe("7");
    calculatorContentLineNormalButtons.at(0).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler1")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(1).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(1).text()).toBe("8");
    calculatorContentLineNormalButtons.at(1).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler2")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(2).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(2).text()).toBe("9");
    calculatorContentLineNormalButtons.at(2).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler3")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(3).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(3).text()).toBe("x");
    calculatorContentLineNormalButtons.at(3).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler4")).toBeTruthy();
  });

  test("it renders the content of sixth line of the calculator", async () => {
    const wrapper = shallowMount(CalculatorLineContent, {
      localVue,
      i18n,
      store,
      propsData: { icons: ["4", "5", "6", "-"] },
    });

    const calculatorContentLine = wrapper.find(".calculator-content-line");
    expect(calculatorContentLine.exists()).toBe(true);

    const calculatorContentLineNormalButtons = wrapper.findAll(
      ".calculator-content-line-normal-button"
    );
    expect(calculatorContentLineNormalButtons.length).toBe(4);
    expect(
      calculatorContentLineNormalButtons.at(0).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(0).text()).toBe("4");
    calculatorContentLineNormalButtons.at(0).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler1")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(1).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(1).text()).toBe("5");
    calculatorContentLineNormalButtons.at(1).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler2")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(2).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(2).text()).toBe("6");
    calculatorContentLineNormalButtons.at(2).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler3")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(3).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(3).text()).toBe("-");
    calculatorContentLineNormalButtons.at(3).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler4")).toBeTruthy();
  });

  test("it renders the content of seventh line of the calculator", async () => {
    const wrapper = shallowMount(CalculatorLineContent, {
      localVue,
      i18n,
      store,
      propsData: { icons: ["1", "2", "3", "+"] },
    });

    const calculatorContentLine = wrapper.find(".calculator-content-line");
    expect(calculatorContentLine.exists()).toBe(true);

    const calculatorContentLineNormalButtons = wrapper.findAll(
      ".calculator-content-line-normal-button"
    );
    expect(calculatorContentLineNormalButtons.length).toBe(4);
    expect(
      calculatorContentLineNormalButtons.at(0).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(0).text()).toBe("1");
    calculatorContentLineNormalButtons.at(0).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler1")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(1).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(1).text()).toBe("2");
    calculatorContentLineNormalButtons.at(1).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler2")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(2).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(2).text()).toBe("3");
    calculatorContentLineNormalButtons.at(2).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler3")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(3).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(3).text()).toBe("+");
    calculatorContentLineNormalButtons.at(3).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler4")).toBeTruthy();
  });

  test("it renders the content of eighth line of the calculator", async () => {
    const wrapper = shallowMount(CalculatorLineContent, {
      localVue,
      i18n,
      store,
      propsData: {
        icons: ["±", "0", ".", "="],
        classButtons: [
          "calculator-content-line-normal-button",
          "calculator-content-line-normal-button",
          "calculator-content-line-normal-button",
          "calculator-content-line-equal-button",
        ],
      },
    });

    const calculatorContentLine = wrapper.find(".calculator-content-line");
    expect(calculatorContentLine.exists()).toBe(true);

    const calculatorContentLineNormalButtons = wrapper.findAll(
      ".calculator-content-line-normal-button"
    );
    expect(calculatorContentLineNormalButtons.length).toBe(3);

    const calculatorContentLineEqualButton = wrapper.find(
      ".calculator-content-line-equal-button"
    );
    expect(calculatorContentLineEqualButton.exists()).toBe(true);

    expect(
      calculatorContentLineNormalButtons.at(0).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(0).text()).toBe("±");
    calculatorContentLineNormalButtons.at(0).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler1")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(1).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(1).text()).toBe("0");
    calculatorContentLineNormalButtons.at(1).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler2")).toBeTruthy();

    expect(
      calculatorContentLineNormalButtons.at(2).attributes("disabled")
    ).toBe(undefined);
    expect(calculatorContentLineNormalButtons.at(2).text()).toBe(".");
    calculatorContentLineNormalButtons.at(2).trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler3")).toBeTruthy();

    expect(calculatorContentLineEqualButton.attributes("disabled")).toBe(
      undefined
    );
    expect(calculatorContentLineEqualButton.text()).toBe("=");
    calculatorContentLineEqualButton.trigger("click")
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("handler4")).toBeTruthy();
  });
});
