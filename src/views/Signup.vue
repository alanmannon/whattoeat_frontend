<template>
  <div class="container">

    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form class="user" v-on:submit.prevent="submit()">
                <div class="form-group">
                  <input type="text" class="form-control form-control-user" v-model="username" placeholder="Username">
                </div>
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input type="text" class="form-control form-control-user" v-model="city_name" placeholder="City Name">
                  </div>
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input type="text" class="form-control form-control-user" v-model="state_code" placeholder="State (i.e. IL, NY)">
                  </div>
                   
                </div>
                <div class="form-group">
                  <input type="email" class="form-control form-control-user" v-model="email" placeholder="Email Address">
                </div>
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input type="password" class="form-control form-control-user" v-model="password" placeholder="Password">
                  </div>
                  <div class="col-sm-6">
                    <input type="password" class="form-control form-control-user" v-model="passwordConfirmation" placeholder="Repeat Password">
                  </div>
                </div>
                <input type="submit" class="btn btn-primary btn-user btn-block" value="Register Account">
              </form>
              <hr>
              <div class="text-center">
                <a class="small" href="/login">Already have an account? Login!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  
</template> 

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      city_name: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        username: this.username,
        email: this.email,
        password: this.password,
        city_name: this.city_name,

        // password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/user", params)
        .then((response) => {
          console.log(params);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>