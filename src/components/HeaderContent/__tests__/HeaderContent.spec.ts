import { mount, createLocalVue } from "@vue/test-utils";
import VueI18n from "vue-i18n";
import es from "@/locales/es-ES.json";
import en from "@/locales/en-US.json";
import pt from "@/locales/pt-PT.json";
import HeaderContent from "@/components/HeaderContent/HeaderContent.vue";

const localVue = createLocalVue();
localVue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en-US",
  fallbackLocale: "en-US",
  messages: { es, en, pt },
  silentFallbackWarn: true,
});

describe("HeaderContent", () => {
  test("shows the content successfully with current value, no result and no error", () => {
    const wrapper = mount(HeaderContent, {
      localVue,
      i18n,
      propsData: { currentValue: "0", currentResult: "", error: "" },
    });

    expect(wrapper.classes("calculator-content-header")).toBe(true);

    const calculatorHeaderTitle = wrapper.find(
      ".calculator-content-header-title"
    );
    expect(calculatorHeaderTitle.exists()).toBe(true);
    expect(calculatorHeaderTitle.text()).toBe(wrapper.vm.$t("calculator"));

    const calculatorHeaderResult = wrapper.find(
      ".calculator-content-header-result"
    );
    expect(calculatorHeaderResult.exists()).toBe(true);

    const calculatorHeaderResultText = wrapper.find(
      ".calculator-content-header-result-text"
    );
    expect(calculatorHeaderResultText.exists()).toBe(true);
    expect(calculatorHeaderResultText.text()).toBe("0");

    const calculatorHeaderResultTextError = wrapper.find(
      ".calculator-content-header-result-text-error"
    );
    expect(calculatorHeaderResultTextError.exists()).toBe(false);
  });

  test("shows the content successfully with current value, current result and no error", () => {
    const wrapper = mount(HeaderContent, {
      localVue,
      i18n,
      propsData: { currentValue: "10", currentResult: "100", error: "" },
    });

    expect(wrapper.classes("calculator-content-header")).toBe(true);

    const calculatorHeaderTitle = wrapper.find(
      ".calculator-content-header-title"
    );
    expect(calculatorHeaderTitle.exists()).toBe(true);
    expect(calculatorHeaderTitle.text()).toBe(wrapper.vm.$t("calculator"));

    const calculatorHeaderResult = wrapper.find(
      ".calculator-content-header-result"
    );
    expect(calculatorHeaderResult.exists()).toBe(true);

    const calculatorHeaderResultText = wrapper.find(
      ".calculator-content-header-result-text"
    );
    expect(calculatorHeaderResultText.exists()).toBe(true);
    expect(calculatorHeaderResultText.text()).toBe("100");

    const calculatorHeaderResultTextError = wrapper.find(
      ".calculator-content-header-result-text-error"
    );
    expect(calculatorHeaderResultTextError.exists()).toBe(false);
  });

  test("shows the content successfully with current value that has error", () => {
    const wrapper = mount(HeaderContent, {
      localVue,
      i18n,
      propsData: {
        currentValue: "Cannot divide by zero",
        currentResult: "",
        error: "Cannot divide by zero",
      },
    });

    expect(wrapper.classes("calculator-content-header")).toBe(true);

    const calculatorHeaderTitle = wrapper.find(
      ".calculator-content-header-title"
    );
    expect(calculatorHeaderTitle.exists()).toBe(true);
    expect(calculatorHeaderTitle.text()).toBe(wrapper.vm.$t("calculator"));

    const calculatorHeaderResult = wrapper.find(
      ".calculator-content-header-result"
    );
    expect(calculatorHeaderResult.exists()).toBe(true);

    const calculatorHeaderResultText = wrapper.find(
      ".calculator-content-header-result-text"
    );
    expect(calculatorHeaderResultText.exists()).toBe(true);

    const calculatorHeaderResultTextError = wrapper.find(
      ".calculator-content-header-result-text-error"
    );
    expect(calculatorHeaderResultTextError.exists()).toBe(true);
    expect(calculatorHeaderResultTextError.text()).toBe(
      "Cannot divide by zero"
    );
  });
});
