/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueI18n from "vue-i18n";
import Vuex from "vuex";
import es from "@/locales/es-ES.json";
import en from "@/locales/en-US.json";
import pt from "@/locales/pt-PT.json";
import LanguagesContent from "@/components/LanguagesContent/LanguagesContent.vue";
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

describe("LanguagesContent", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallowMount(LanguagesContent, {
      localVue,
      i18n,
      store,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("it renders the component", async () => {
    const calculatorLanguagesContent = wrapper.find(".calculator-languages");
    expect(calculatorLanguagesContent.exists()).toBe(true);

    const calculatorLanguageActive = wrapper.find(
      ".calculator-language-active"
    );
    expect(calculatorLanguageActive.exists()).toBe(true);
    expect(calculatorLanguageActive.text()).toBe("EN");

    expect(
      store.getters.languages.find((l: any) => l.key === "en-US").active
    ).toBe(true);
    expect(
      store.getters.languages.find((l: any) => l.key === "es-ES").active
    ).toBe(false);
    expect(
      store.getters.languages.find((l: any) => l.key === "pt-PT").active
    ).toBe(false);
    expect(wrapper.vm.$i18n.locale).toBe("en-US");
  });

  test("when click on ES, change language to Spanish", async () => {
    const calculatorLanguageES = wrapper.find(".calculator-language-ES");
    expect(calculatorLanguageES.exists()).toBe(true);
    calculatorLanguageES.trigger("click");
    await wrapper.vm.$nextTick();

    const calculatorLanguageActive = wrapper.find(
      ".calculator-language-active"
    );
    expect(calculatorLanguageActive.exists()).toBe(true);
    expect(calculatorLanguageActive.text()).toBe("ES");

    expect(
      store.getters.languages.find((l: any) => l.key === "en-US").active
    ).toBe(false);
    expect(
      store.getters.languages.find((l: any) => l.key === "es-ES").active
    ).toBe(true);
    expect(
      store.getters.languages.find((l: any) => l.key === "pt-PT").active
    ).toBe(false);
    expect(wrapper.vm.$i18n.locale).toBe("es-ES");
  });

  test("when click on PT, change language to Portuguese", async () => {
    const calculatorLanguageES = wrapper.find(".calculator-language-PT");
    expect(calculatorLanguageES.exists()).toBe(true);
    calculatorLanguageES.trigger("click");
    await wrapper.vm.$nextTick();

    const calculatorLanguageActive = wrapper.find(
      ".calculator-language-active"
    );
    expect(calculatorLanguageActive.exists()).toBe(true);
    expect(calculatorLanguageActive.text()).toBe("PT");

    expect(
      store.getters.languages.find((l: any) => l.key === "en-US").active
    ).toBe(false);
    expect(
      store.getters.languages.find((l: any) => l.key === "es-ES").active
    ).toBe(false);
    expect(
      store.getters.languages.find((l: any) => l.key === "pt-PT").active
    ).toBe(true);
    expect(wrapper.vm.$i18n.locale).toBe("pt-PT");
  });

  test("when click on EN, change language to English", async () => {
    const calculatorLanguageES = wrapper.find(".calculator-language-ES");
    expect(calculatorLanguageES.exists()).toBe(true);
    calculatorLanguageES.trigger("click");
    await wrapper.vm.$nextTick();

    const calculatorLanguageEN = wrapper.find(".calculator-language-EN");
    expect(calculatorLanguageEN.exists()).toBe(true);
    calculatorLanguageEN.trigger("click");
    await wrapper.vm.$nextTick();

    const calculatorLanguageActive = wrapper.find(
      ".calculator-language-active"
    );
    expect(calculatorLanguageActive.exists()).toBe(true);
    expect(calculatorLanguageActive.text()).toBe("EN");

    expect(
      store.getters.languages.find((l: any) => l.key === "en-US").active
    ).toBe(true);
    expect(
      store.getters.languages.find((l: any) => l.key === "es-ES").active
    ).toBe(false);
    expect(
      store.getters.languages.find((l: any) => l.key === "pt-PT").active
    ).toBe(false);
    expect(wrapper.vm.$i18n.locale).toBe("en-US");
  });
});
