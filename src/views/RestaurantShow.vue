<template>
  <div class="container" align="center">
    <div class="home">
      <h1>{{ restaurant.name }}</h1>
      <h1>{{ restaurant.location["address"] }}</h1>
      <h1>{{ restaurant.cuisines }}</h1>
      <h1>{{ restaurant.phone_numbers }}</h1>
      <h1>{{ restaurant.timings }}</h1>
      <h1>Price Range: {{ price_range }}</h1>
        <select v-model="selected">
          <option v-for="group in group_ids" v-bind:value="group.value">
            {{ group.text }}
          </option>
        </select>
      </div>
      <br>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" v-on:click="addRestaurant()">Add restaurant</button>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Saved!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{ restaurant.name }} has been successfully saved.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
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
      // message: `${this.$route.query.restid}`,
      restaurant: [],
      price_range: [],
      currency: "$",
      response: [],
      group_ids: [
        { text: "Favorites", value: "1" },
        { text: "Quick Bites", value: "2" },
        { text: "Special Occasion", value: "3" },
        { text: "Want to Try", value: "4" },
      ],
      selected: "1",
    };
  },
  created: function () {
    this.zomatoShow();
    this.getGroupID();
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
        group_id: this.selected,
        restaurant_name: this.restaurant.name,
      };
      axios.post("/api/usergroup", params).then((response) => {
        this.response = response.data;
      });
      console.log(params);
    },
    getGroupID: function () {
      axios.get("/api/groups").then((response) => {
        this.response = this.group_ids;
        console.log(this.group_ids);
      });
    },
  },
};
</script>
