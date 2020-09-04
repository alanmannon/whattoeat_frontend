<template>
  <div class="home">
    <div v-for='group in groups'>
      <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-warning shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">{{ group.name }}</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">put number here</div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
    <div>
      {{userinfo.username}}
      {{userinfo.email}}
      {{userinfo.city_name}}
      {{userinfo.state_code}}
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