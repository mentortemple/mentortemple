<template>
  <div class="gradient">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-8 col-xs-12 offset-lg-3 offset-md-2 col-xs-12 text-center">
          <h1 class="primary my-4">Sign Up</h1>

          <div class="card auth-card text-center">
            <div class="card-body">
              <form v-on:submit.prevent="signup">
                <div class="form-group mb-4 animated slideInDown" v-if="error">
                  <span class="text-danger d-block w-100 alert alert-danger">{{ error }}</span>
                </div>
                <div class="form-group">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="username">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <input required type="text" class="form-control auth-control" v-model="user.username" placeholder="Username" aria-label="Username" aria-describedby="username">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="email">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </div>
                    <input required type="email" v-model="user.email" class="form-control auth-control" placeholder="Email Address" aria-label="Email Address" aria-describedby="email">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span v-on:click="toggleHidePassword" class="input-group-text toggle-hide-password" id="password">
                        <i :class="hidePassword ? 'fas fa-eye-slash': 'fas fa-eye'"></i>
                      </span>
                    </div>
                    <input required :type="hidePassword ? 'password' : 'text'" class="form-control auth-control" v-model="user.password" placeholder="Password" aria-label="Password" aria-describedby="password">
                  </div>
                </div>
                <button :disabled="loading" class="btn auth-button btn-primary hero-button form-control">
                  {{ loading ? 'Signing you up ...': 'Sign up' }}
                </button>
                <div class="hr-divider text-center my-5">
                  <span class="hr-divider-text">Or Sign Up With</span>
                </div>
                <AuthButton provider="facebook" />
                <AuthButton provider="github" />
              </form>
            </div>
          </div>

          <div class="auth-extra">
            <h2 class="text-center mb-5">Have an account ?</h2>
            <nuxt-link to="/auth/signin">
              <button class="btn btn-transparent">
                Login
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_AUTH_USER_LOCAL_SIGNUP } from "@/store";
import AuthButton from "@/components/AuthButton";

export default {
  middleware: "notAuthenticated",
  components: {
    AuthButton
  },
  data() {
    return {
      hidePassword: true,
      loading: false,
      user: {
        username: "",
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    toggleHidePassword() {
      this.hidePassword = !this.hidePassword;
    },
    signup() {
      this.loading = true;
      this.$store
        .dispatch(SET_AUTH_USER_LOCAL_SIGNUP, this.user)
        .then(() => {
          const intended = localStorage.getItem("intended");

          if (intended) {
            this.$router.push(intended);
          } else {
            this.$router.push("/");
          }
        })
        .catch(error => {
          this.loading = false;
          this.error = error.message;
        });
    }
  },
  watch: {
    "user.email"() {
      this.error = null;
    },
    "user.username"() {
      this.error = null;
    },
    "user.password"() {
      this.error = null;
    }
  }
};
</script>

<style>
.toggle-hide-password {
  cursor: pointer;
}
</style>
