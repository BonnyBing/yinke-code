<template>
  <div id="app">
    <SingleElementTransition/>
    <SingleElementAnimation/>
    <StateTransition/>
  </div>
</template>

<script>

import SingleElementTransition from "@/components/SingleElementTransition.vue";
import SingleElementAnimation from "@/components/SingleElementAnimation.vue";
import StateTransition from "@/components/StateTransition";

export default {
  name: 'App',
  components: {
    SingleElementAnimation,
    SingleElementTransition,
    StateTransition
  }
}
</script>

