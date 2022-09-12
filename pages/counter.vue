<template>
  <div class="container">
    <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 mt-3">
      <div class="col">
        <button type="button" class="btn btn-warning" @click="min">
          Kurang
        </button>
      </div>
      <div class="col">
        <h1>{{ $store.state.counter }}</h1>
      </div>
      <div class="col">
        <button type="button" class="btn btn-primary" @click="add">
          Tambah
        </button>
      </div>
    </div>
    <nuxt-link to="./counter_watch">Go To Store</nuxt-link>
  </div>
</template>

<script>
export default {
  methods: {
    add() {
      this.$store.commit("add");
    },
    min() {
      this.$store.commit("min");
    },
  },
};
</script>