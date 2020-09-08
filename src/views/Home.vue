<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
</template>

<style>
</style>

<script>
export default {
  data: function () {
    return {
      message: "THIS SHOULD CHANGE",
    };
  },
  created: function () {
    this.pushToLogin();
  },
  methods: {
    pushToLogin: function () {
      this.$router.push("/login");
    },
  },
};
</script>