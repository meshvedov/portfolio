<template>
  <section>
    <div class="header__wrapper">
      <h1>Vue message 2: {{ message }}</h1>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      message: null,
    }
  },
  created () {
    this.message = this.$store.getters.getMessage
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: green;
}
</style>
