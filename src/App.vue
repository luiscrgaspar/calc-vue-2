<template>
  <div id="app">
    <CalculatorContainer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CalculatorContainer from './components/CalculatorContainer/CalculatorContainer.vue';

export default Vue.extend({
  name: "App",
  components: {
    CalculatorContainer,
  },
});
</script>
