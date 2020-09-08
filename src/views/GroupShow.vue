<template>
  <div class="home">
    <div class="container" align="center">
      <h1> {{ group_name.name }} </h1>
      <div class="card-group" align="center">
        <div v-for='group in groups'>
          <div class="card h-100" style="width: 20rem;">
            <img class="card-img-top" src="">
            <div class="card-body">
              <h5 class="card-title">{{ group.restaurant_name }}</h5>
              <p class="card-text"></p>
              <a v-bind:href='`/show?restid=${group.restaurant_id}`' class="btn btn-primary">More Info</a> &nbsp;&nbsp;
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" v-on:click="currentRestID(group.id)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div> 
      <!-- Modal -->
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Are You Sure?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Press Delete to Remove This Restaurant
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button v-on:click="deleteRest()" type="button" data-dismiss="modal" class="btn btn-primary">Delete</button>
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
      restaurant: [],
      current_id: 1,
      group_name: [],
    };
  },
  created: function () {
    this.getGroup();
    this.getGroupName();
  },
  methods: {
    getGroup: function () {
      axios
        .get(`/api/usergroup?group_id=${this.$route.query.group_id}`)
        .then((response) => {
          this.groups = response.data;
          console.log(response.data);
        });
    },
    zomatoShow: function () {
      console.log(this.$route.query.restid);
      axios
        .get(
          `https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.restaurant_id}`,
          { headers: { "user-key": process.env.VUE_APP_ZOMATO } }
        )
        .then((response) => {
          this.restaurant = response.data;
        });
    },
    deleteRest: function () {
      axios.delete(`/api/usergroup/${this.current_id}`).then((response) => {
        window.location.reload();
      });
    },
    currentRestID: function () {
      this.current_id = arguments[0];
      console.log(this.current_id);
    },
    getGroupName: function () {
      axios
        .get(`/api/groups/${this.$route.query.group_id}`)
        .then((response) => {
          this.group_name = response.data;
        });
    },
  },
};
</script>












 <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>



    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>