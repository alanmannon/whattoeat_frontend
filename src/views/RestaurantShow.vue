<template>
  <div class="home">
     <h1>{{ restaurant.name }}</h1>
     <h1>{{ restaurant.location["address"] }}</h1>
     <h1>{{ restaurant.cuisines }}</h1>
     <h1>{{ restaurant.phone_numbers }}</h1>
     <h1>{{ restaurant.timings }}</h1>
     <h1>Price Range: {{ price_range }}</h1>
  <button v-on:click="addRestaurant()">Add restaurant</button>
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
      price_range: [],
      currency: "$",
      response: [],
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
          var tempPrice = response.data;
          this.price_range = this.currency.repeat(
            parseInt(tempPrice.price_range)
          );
        });
    },
    addRestaurant: function () {
      var params = {
        restaurant_id: `${this.$route.query.restid}`,
        user_id: localStorage.getItem("jwt"),
        group_id: "1",
      };
      axios.post("/api/usergroup", params).then((response) => {
        this.response = response.data;
      });
      console.log(params);
    },
  },
};
</script>
