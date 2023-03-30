<template>
  <div class="calculator-content-line">
    <button
      :class="classButtons[index]"
      v-for="(icon, index) in icons"
      :key="`prop_${index}`"
      @click="$emit(`handler${index + 1}`, Number.isInteger(+icon) ? icon : undefined )"
      :disabled="disabledButtons[index]"
    >
      {{ icon }}
    </button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CalculatorLineContent",
  props: {
    icons: Array as () => string[],
    handlers: Array as () => string[],
    disabledButtons: {
      type: Array as () => boolean[],
      default: () => [false, false, false, false],
    },
    classButtons: {
      type: Array as () => string[],
      default: () => [
        "calculator-content-line-normal-button",
        "calculator-content-line-normal-button",
        "calculator-content-line-normal-button",
        "calculator-content-line-normal-button",
      ],
    },
  },
  components: {},
  data: () => {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.calculator-content-line {
  display: flex;
  width: 100%;
  height: 50px;
  gap: 4px;

  &-normal-button,
  &-equal-button {
    width: 70px;
    height: 45px;
    border-radius: 4px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    border: none;
  }

  &-normal-button {
    &:focus {
      border: none;
      outline: none;
    }

    &:hover {
      background-color: #e5e5e5;
    }
  }

  &-normal-button:disabled {
    background-color: #a8a7a7;
    color: #150c24;
    cursor: not-allowed;
  }

  &-equal-button {
    background-color: black;
    color: white;
  }
}
</style>
