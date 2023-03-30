<template>
  <div
    class="calculator-content-header"
  >
    <span
      class="calculator-content-header-title"
      >{{ $t("calculator") }}</span
    >
    <div class="calculator-content-header-result">
      <span
        :class="`calculator-content-header-result-text ${
          error !== '' ? 'calculator-content-header-result-text-error' : ''
        }`"
        >{{ currentResult || currentValue }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HeaderContent",
  props: {
    currentValue: String,
    currentResult: String,
    error: String,
  },
  components: {},
  data: () => {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.calculator-content-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 290px;

  &-title {
    height: 40px;
    font-weight: 700;
    color: #ffffff;
    padding-top: 12px;
  }

  &-result {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: end;
    background-color: #ffffff;
    border-radius: 4px;
    color: #150c24;
    text-align: right;
    font-size: 44px;
    margin-bottom: 8px;
    overflow: hidden;
  }

  &-result-text {
    padding-right: 8px;
  }

  &-result-text-error {
    font-size: 22px;
  }
}
</style>
