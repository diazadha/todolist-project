<template>
  <div class="container">
    <h1>{{ $store.state.counter }}</h1>
    <nuxt-link to="./counter">Back</nuxt-link>
  </div>
</template>


<script>
export default {
  watch: {
    "$store.state.counter": {
      handler(newValue, oldValue) {
        console.log(newValue);
      },
      deep: true,
    },
  },
};
</script>