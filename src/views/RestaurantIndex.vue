<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h3>{{ index }}</h3>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Restaurants Near You",
      index: [],
    };
  },
  created: function () {
    this.zomatoIndex();
  },
  methods: {
    zomatoIndex: function () {
      axios
        .get(
          "https://developers.zomato.com/api/v2.1/location_details?entity_id=5200&entity_type=city",
          { headers: { "user-key": "API KEY API KEY API KEY" } }
        )
        .then((response) => {
          this.index = response.data;
        });
    },
  },
};
</script>