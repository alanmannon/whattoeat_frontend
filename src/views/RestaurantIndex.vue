
<template>
  <div class="container" align="center">
    <h1> {{ message }} </h1>
    <div class="card-group" align="center">
      <div v-for='restaurant in restaurants["best_rated_restaurant"]'>
        <div class="card h-100" style="width: 20rem;">
          <img class="card-img-top" src="">
          <div class="card-body">
            <h5 class="card-title">{{restaurant["restaurant"]["name"]}}</h5>
            <p class="card-text">{{ restaurant["restaurant"]["cuisines"] }}</p>
            <a v-bind:href='`/show?restid=${restaurant["restaurant"]["id"]}`' class="btn btn-primary">More Info</a>
          </div>
        </div>
      </div>
    </div>
  
 

  
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Top Restaurants Near You",
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

