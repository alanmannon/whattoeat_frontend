<template>
  <div class="home">
    <div class="containter" align="center">
      <div>
        <h1>{{userinfo.username}}</h1>
        <h3>{{userinfo.city_name}}, {{userinfo.state_code}}</h3>
        
      </div>
      <div v-for='group in groups'>
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-warning shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <a class="text-md font-weight-bold text-warning text-uppercase mb-1" v-bind:href='`/group?group_id=`'>{{ group.name }}</a>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">{{ group.name }} Restaurants</div>
                </div>
              </div>
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
      message: "CURRENT USER PAGE",
      groups: [],
      userinfo: [],
    };
  },
  created: function () {
    this.groupList();
    this.userInfo();
  },
  methods: {
    groupList: function () {
      axios.get("/api/groups").then((response) => {
        console.log(response.data);
        this.groups = response.data;
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