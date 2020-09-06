<template>
  <div class="home">
    <h1 class="text-center">{{ message }}</h1>
    <div class="container" align="center">
      <select v-model="selected">
          <option v-for="group in group_ids" v-bind:value="group.value">
            {{ group.text }}
          </option>
        </select>
        <hr>
        <button type="button" class="btn btn-primary" v-on:click="getUserGroup()" data-toggle="modal" data-target="#exampleModal"> ROLL </button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ restaurant.name }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{ restaurant.cuisines}}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="toRestPage();">Restaurant Page</button>
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
      message: "Find a Place to Eat",
      group_ids: [
        { text: "Favorites", value: "1" },
        { text: "Quick Bites", value: "2" },
        { text: "Special Occasion", value: "3" },
        { text: "Want to Try", value: "4" },
      ],
      selected: "1",
      response: [],
      rolled: [],
      restaurant: [],
    };
  },
  created: function () {},
  methods: {
    getUserGroup: function () {
      axios
        .get(`/api/usergroup/${this.selected}?group_id=${this.selected}`)
        .then((response) => {
          this.response = response.data;
          console.log(response.data);
          this.zomatoShow((this.response = response.data));
        });
    },
    zomatoShow: function () {
      console.log(this.$route.query.restid);
      axios
        .get(
          `https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.response.restaurant_id}`,
          { headers: { "user-key": process.env.VUE_APP_ZOMATO } }
        )
        .then((response) => {
          this.restaurant = response.data;
        });
    },
    toRestPage: function () {
      this.$router.push(`/show?restid=${this.response.restaurant_id}`);
    },
  },
};
</script>

