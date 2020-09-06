<template>
 <div class="login">

  <div class="container">

    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-xl-10 col-lg-12 col-md-9">

        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <form class="user" v-on:submit.prevent="submit()">
                    <div class="form-group">
                      <input type="email" v-model='email' class="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..."> 
                    </div>
                    <div class="form-group">
                      <input type="password" v-model="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password">
                    </div>
                   
                    <input type="submit" class="btn btn-primary btn-user btn-block" value="Login">

                  
                  </form>
                  <div class="text-center">
                    <a class="small" href="/signup">Create an Account!</a>
                  </div>
                </div>
              </div>
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
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/session", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          console.log(response.data.jwt);
          console.log(response.data.location);
          localStorage.setItem("location", response.data.location);
          localStorage.setItem("jwt", response.data.jwt);
          console.log(localStorage.getItem("jwt"));
          this.$router.push("/user/");
        })
        .catch((error) => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>