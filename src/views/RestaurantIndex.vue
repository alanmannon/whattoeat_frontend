
<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for='restaurant in restaurants["best_rated_restaurant"]'>
      <!-- image = {{restaurant["restaurant"]["photos_url"]}} -->
      <!-- <img v-bind:src='restaurant["restaurant"]["photos_url"]'> -->
      {{restaurant["restaurant"]["name"]}}
      {{restaurant["restaurant"]["timings"]}}
    </div>
    <h3>{{restaurants["best_rated_restaurant"][1]["restaurant"]}}</h3>
  
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Restaurants Near You",
      restaurants: [],
      currentuser: [],
    };
  },
  created: function () {
    this.zomatoIndex();
  },
  methods: {
    currentUser: function () {
      axios.get(`/api/user/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
        this.currentuser = response.data;
      });
    },
    zomatoIndex: function () {
      axios
        .get(
          `https://developers.zomato.com/api/v2.1/location_details?entity_id=${localStorage.getItem(
            "location"
          )}&entity_type=city`,
          { headers: { "user-key": process.env.VUE_APP_ZOMATO } }
        )
        .then((response) => {
          this.restaurants = response.data;
        });
    },
  },
};
</script>

