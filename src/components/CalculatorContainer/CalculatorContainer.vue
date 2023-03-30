<template>
  <div>
    <LanguagesContent />
    <div class="calculator-content">
      <HeaderContent
        :error="error"
        :currentValue="currentValue.toString()"
        :currentResult="currentResult.toString()"
      />
      <CalculatorLineContent
        :icons="iconsLine1"
        @handler1="clickOnPiKey"
        @handler2="clickOnCEKey"
        @handler3="reset"
        @handler4="clickOnBackKey"
      />
      <CalculatorLineContent
        :icons="iconsLine2"
        :disabledButtons="[
          !currentMemoryValue,
          !currentMemoryValue,
          false,
          false,
        ]"
        @handler1="clickOnMCKey"
        @handler2="clickOnMRKey"
        @handler3="clickOnMSKey"
        @handler4="clickOnPercentageKey"
      />
      <CalculatorLineContent
        :icons="iconsLine3"
        @handler1="clickOnXToThePowerOf2"
        @handler2="clickOnXToThePowerOf3"
        @handler3="clickOnSquareRoot"
        @handler4="clickOnCubicRoot"
      />
      <CalculatorLineContent
        :icons="iconsLine4"
        @handler1="clickOnFactorial"
        @handler2="clickOnOneDividedByX"
        @handler3="clickOnEKey"
        @handler4="clickOnDivisionKey"
      />
      <CalculatorLineContent
        :icons="iconsLine5"
        @handler1="clickOnNumber"
        @handler2="clickOnNumber"
        @handler3="clickOnNumber"
        @handler4="clickOnMultiplicationKey"
      />
      <CalculatorLineContent
        :icons="iconsLine6"
        @handler1="clickOnNumber"
        @handler2="clickOnNumber"
        @handler3="clickOnNumber"
        @handler4="clickOnSubtractionKey"
      />
      <CalculatorLineContent
        :icons="iconsLine7"
        @handler1="clickOnNumber"
        @handler2="clickOnNumber"
        @handler3="clickOnNumber"
        @handler4="clickOnAdditionKey"
      />
      <CalculatorLineContent
        :icons="iconsLine8"
        :classButtons="[
          'calculator-content-line-normal-button',
          'calculator-content-line-normal-button',
          'calculator-content-line-normal-button',
          'calculator-content-line-equal-button',
        ]"
        :disabledButtons="[false, false, false, error || isInfinity]"
        @handler1="clickOnPlusMinusKey"
        @handler2="clickOnNumberZero"
        @handler3="clickOnPointKey"
        @handler4="clickOnEqualKey"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import LanguagesContent from "@/components/LanguagesContent/LanguagesContent.vue";
import CalculatorLineContent from "@/components/CalculatorLineContent/CalculatorLineContent.vue";
import HeaderContent from "@/components/HeaderContent/HeaderContent.vue";

export default Vue.extend({
  name: "CalculatorContainer",
  components: { LanguagesContent, CalculatorLineContent, HeaderContent },
  data: () => {
    return {
      iconsLine1: ["π", "CE", "C", "<"],
      iconsLine2: ["MC", "MR", "MS", "%"],
      iconsLine3: ["x²", "x³", "²√x", "³√x"],
      iconsLine4: ["n!", "1/x", "e", "÷"],
      iconsLine5: ["7", "8", "9", "x"],
      iconsLine6: ["4", "5", "6", "-"],
      iconsLine7: ["1", "2", "3", "+"],
      iconsLine8: ["±", "0", ".", "="],
    };
  },
  computed: {
    ...mapGetters([
      "currentTemporaryValue",
      "currentValue",
      "currentMemoryValue",
      "currentOperator",
      "goingToDoOperation",
      "currentResult",
      "isInfinity",
      "alreadyDoneEqualOperation",
      "error",
    ]),
  },
  methods: {
    ...mapActions([
      "addToCurrentValue",
      "setCurrentValue",
      "setCurrentTemporaryValue",
      "setCurrentMemoryValue",
      "setCurrentOperator",
      "setGoingToDoOperation",
      "setCurrentResult",
      "setIsInfinity",
      "setAlreadyDoneEqualOperation",
      "setError",
    ]),
    reset(): void {
      this.setCurrentValue("0");
      this.setCurrentTemporaryValue("");
      this.setCurrentOperator("");
      this.setCurrentResult("");
      this.setIsInfinity(false);
      this.setError("");
    },
    clickOnPiKey(): void {
      this.setCurrentValue(Math.PI.toFixed(11).toString());
    },
    clickOnCEKey(): void {
      this.currentResult !== "" || this.error !== ""
        ? this.reset()
        : this.setCurrentValue("0");
    },
    clickOnMCKey(): void {
      this.setCurrentMemoryValue("");
    },
    clickOnMRKey(): void {
      this.setCurrentValue(this.currentMemoryValue);
    },
    clickOnMSKey(): void {
      if (this.currentValue !== "0") {
        this.setCurrentMemoryValue(this.currentValue);
      }
    },
    clickOnPercentageKey(): void {
      this.setCurrentValue(
        this.currentOperator !== ""
          ? (+this.currentValue / 100).toString()
          : "0"
      );
    },
    countNumberBeforePoint(value: number): number {
      if (Math.floor(value) === value) return 0;
      return value.toString().split(".")[0].length || 0;
    },
    countDecimals(value: number): number {
      if (Math.floor(value) === value) return 0;
      return value.toString().split(".")[1]?.length || 0;
    },
    clickOnBackKey(): void {
      this.setCurrentValue(
        this.currentValue.length === 1 ? "0" : this.currentValue.slice(0, -1)
      );
    },
    getFormattedResult(result: number): number | string {
      if (result === Infinity) {
        this.setIsInfinity(true);
        return this.$t("infinity").toString();
      }
      this.setIsInfinity(false);
      const totalNumberResult = result.toString().length;
      if (this.currentOperator === "/")
        return totalNumberResult > 12 ? result.toFixed(this.getMinDecimalPlaces(result)) : result;
      return totalNumberResult > 12
        ? Number.parseFloat(result.toString()).toExponential(6)
        : +result;
    },
    clickOnXToThePowerOf2(): void {
      const result = +this.currentValue * +this.currentValue;
      this.setCurrentValue(this.getFormattedResult(result));
    },
    clickOnXToThePowerOf3(): void {
      const result =
        +this.currentValue * +this.currentValue * +this.currentValue;
      this.setCurrentValue(this.getFormattedResult(result));
    },
    setResultOperationOrInvalidInput(value: number, error: string): void {
      this.setCurrentValue(
        this.currentValue >= 0
          ? value.toFixed(this.getMinDecimalPlaces(value))
          : this.$t(error)
      );
    },
    clickOnSquareRoot(): void {
      this.setError(
        this.currentValue < 0 ? "invalid_number_for_square_root" : ""
      );
      const valueToMakeSquareRoot = Math.sqrt(+this.currentValue);
      this.setResultOperationOrInvalidInput(
        valueToMakeSquareRoot,
        "invalid_number_for_square_root"
      );
    },
    clickOnCubicRoot(): void {
      this.setError(
        this.currentValue < 0 ? "invalid_number_for_cubic_root" : ""
      );
      const valueToMakeCubicRoot = +Math.cbrt(+this.currentValue);
      this.setResultOperationOrInvalidInput(
        valueToMakeCubicRoot,
        "invalid_number_for_cubic_root"
      );
    },
    clickOnFactorial(): void {
      let value = +this.currentValue;
      let result = 1;
      while (value > 0) {
        result *= value;
        value--;
      }
      this.setCurrentValue(this.getFormattedResult(result));
    },
    clickOnOneDividedByX(): void {
      const result = 1 / +this.currentValue;
      this.setCurrentValue(
        this.countDecimals(result) > 12
          ? result.toExponential(7)
          : result.toString()
      );
    },
    clickOnEKey(): void {
      this.setCurrentValue(Math.E.toFixed(11).toString());
    },
    operation(operator: string): void {
      this.setAlreadyDoneEqualOperation(false);
      if (this.currentOperator !== "") {
        this.clickOnEqualKey();
      }
      this.setCurrentTemporaryValue(this.currentValue);
      this.setCurrentOperator(operator);
      this.setGoingToDoOperation(true);
    },
    clickOnDivisionKey(): void {
      this.operation("/");
    },
    clickOnMultiplicationKey(): void {
      this.operation("*");
    },
    clickOnSubtractionKey(): void {
      this.operation("-");
    },
    clickOnAdditionKey(): void {
      this.operation("+");
    },
    clickOnNumber(number: string) {
      if (this.alreadyDoneEqualOperation) {
        this.setCurrentValue(number);
        this.setCurrentTemporaryValue("0");
        this.setAlreadyDoneEqualOperation(false);
        this.setCurrentOperator("");
      } else {
        this.addToCurrentValue(number);
      }
    },
    clickOnNumberZero(): void {
      if (this.currentValue !== "0") {
        this.addToCurrentValue("0");
      }
    },
    clickOnPlusMinusKey(): void {
      this.setCurrentValue((+this.currentValue * -1).toString());
    },
    clickOnPointKey(): void {
      if (this.currentValue.indexOf(".") === -1) {
        this.addToCurrentValue(".");
      }
    },
    getMinDecimalPlaces(value: number): number {
      return this.countDecimals(value) === 0
        ? 0
        : Math.min(
            12 - this.countNumberBeforePoint(value),
            value.toString().length
          );
    },
    clickOnEqualKey(): void {
      if (Number.isInteger(+this.setCurrentValue)) return;

      const currentValueNumber = +this.currentValue;
      const currentTemporaryValueNumber =
        this.currentResult !== ""
          ? +this.currentResult
          : +this.currentTemporaryValue;
      const decimalsCurrentNumber = this.countDecimals(currentValueNumber);
      const decimalsCurrentTemporaryNumber = this.countDecimals(
        currentTemporaryValueNumber
      );

      let result: number | string = 0;
      switch (this.currentOperator) {
        case "+":
          result = currentTemporaryValueNumber + currentValueNumber;
          break;
        case "-":
          result = !this.alreadyDoneEqualOperation
            ? currentTemporaryValueNumber - currentValueNumber
            : currentValueNumber - currentTemporaryValueNumber;
          break;
        case "*":
          result = +(currentTemporaryValueNumber * currentValueNumber).toFixed(
            Math.max(decimalsCurrentNumber, decimalsCurrentTemporaryNumber)
          );
          break;
        case "/":
          result =
            currentValueNumber === 0
              ? "divided_by_zero"
              : (!this.alreadyDoneEqualOperation
                  ? currentTemporaryValueNumber / currentValueNumber
                  : currentValueNumber / currentTemporaryValueNumber
                ).toFixed(
                  this.getMinDecimalPlaces(
                    !this.alreadyDoneEqualOperation
                      ? currentTemporaryValueNumber / currentValueNumber
                      : currentValueNumber / currentTemporaryValueNumber
                  )
                );
          break;
        default:
          break;
      }
      this.setError(result === "divided_by_zero" ? "divided_by_zero" : "");

      if (!this.alreadyDoneEqualOperation) {
        this.setCurrentTemporaryValue(currentValueNumber);
        this.setAlreadyDoneEqualOperation(true);
      }
      this.setCurrentValue(
        result !== "divided_by_zero"
          ? this.getFormattedResult(+result)
          : this.$t("divided_by_zero")
      );
    },
  },
});
</script>

<style lang="scss">
.calculator-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 290px;
  height: 550px;
  background-color: #150c24;
  border-radius: 24px;
  font-size: 24px;
  padding: 0 24px;
  background-image: linear-gradient(#325c7f, #6d5a7f, #bf6c86);
}
</style>
