<template>
  <div class="home">
    <div class="container" align="center">
      <h1> {{ message }} </h1>
      <div class="card-group" align="center">
        <div v-for='group in groups["best_rated_restaurant"]'>
          <div class="card h-100" style="width: 20rem;">
            <img class="card-img-top" src="">
            <div class="card-body">
              <h5 class="card-title">{{group}}</h5>
              <p class="card-text">{{ restaurant["restaurant"]["cuisines"] }}</p>
              <a v-bind:href='`/show?restid=${restaurant["restaurant"]["id"]}`' class="btn btn-primary">More Info</a>
            </div>
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
      message: "Welcome to Vue.js!",
      groups: [],
    };
  },
  created: function () {
    this.getGroup();
  },
  methods: {
    getGroup: function () {
      axios
        .get(`/api/usergroup?group_id=${this.$route.query.group_id}`)
        .then((response) => {
          this.group = response.data;
          console.log(response.data);
        });
    },
  },
};
</script>``