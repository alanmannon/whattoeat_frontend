<template>
  <div class="home">
     <h1>{{ restaurant }}</h1>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      // message: `${this.$route.query.restid}`,
      restaurant: [],
    };
  },
  created: function () {
    this.zomatoShow();
  },
  methods: {
    zomatoShow: function () {
      console.log(this.$route.query.restid);
      axios
        .get(
          `https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.$route.query.restid}`,
          { headers: { "user-key": process.env.VUE_APP_ZOMATO } }
        )
        .then((response) => {
          this.restaurant = response.data;
        });
    },
  },
};
</script>
