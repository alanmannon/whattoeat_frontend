<template>
  <div class="home">
    <div class="container">
    <h1 align="center">{{ message }}</h1>
    {{userinfo.location}}
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
  },
  methods: {
    userInfo: function () {
      var params = {
        jwt: localStorage.getItem("jwt"),
      };
      axios.get("/api/user/", params).then((response) => {
        this.userinfo = response.data;
        console.log(response.data);
        this.zomatoSearch();
      });
    },
    zomatoSearch: function () {
      console.log(this.$route.query.location);
      axios
        .get(
          `https://developers.zomato.com/api/v2.1/search?entity_id=${this.$route.query.location}&entity_type=city&q=${this.$route.query.search}`,
          { headers: { "user-key": process.env.VUE_APP_ZOMATO } }
        )
        .then((response) => {
          this.restaurants = response.data;
          console.log(this.restaurants);
        });
    },
  },
};
</script>
${this.$route.query.search}
        https://developers.zomato.com/api/v2.1/search?entity_id=601&q=mcdonald