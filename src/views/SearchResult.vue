<template>
  <div class="home">
    <div class="container">
    <h1 align="center">{{ message }}</h1>
      <div v-for='restaurant in restaurants["restaurants"]'>
        <div class="card">
          <div class="card-header">
            {{restaurant["restaurant"]["name"]}}
          </div>
          <div class="card-body">
            <h5 class="card-title">{{restaurant["restaurant"]["location"]["address"]}}</h5>
            <p class="card-text">{{restaurant["restaurant"]["cuisines"]}}</p>
            <p class="card-text">{{restaurant["restaurant"]["timings"]}}</p>
            <a v-bind:href='`/show?restid=${restaurant["restaurant"]["id"]}`' class="btn btn-primary">Go to page</a>
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
      message: "Search Results",
      userinfo: [],
      restaurants: [],
    };
  },
  created: function () {
    this.userInfo();
    this.zomatoSearch();
  },
  methods: {
    zomatoSearch: function () {
      axios
        .get(
          `https://developers.zomato.com/api/v2.1/search?entity_id=${this.userinfo.location}&q=${this.$route.query.search}`,
          { headers: { "user-key": process.env.VUE_APP_ZOMATO } }
        )
        .then((response) => {
          this.restaurants = response.data;
        });
    },
    userInfo: function () {
      var params = {
        jwt: localStorage.getItem("jwt"),
      };
      axios.get("/api/user/", params).then((response) => {
        console.log(response.data);
        this.userinfo = response.data;
        console.log(response.data);
      });
    },
  },
};
</script>


<div class="card">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>