<template>
  <div class="home">
    <div v-for='group in groups'>
      {{ group.name }}
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
      axios.get(`/api/user/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
        this.userinfo = response.data;
      });
    },
  },
};
</script>