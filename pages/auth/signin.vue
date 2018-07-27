<template>
  <div class="gradient">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-8 col-xs-12 offset-lg-3 offset-md-2 col-xs-12 text-center">
          <h1 class="primary my-4">Sign in</h1>

          <div class="card auth-card text-center">
            <div class="card-body">
              <form v-on:submit.prevent="login">
                <div class="form-group mb-4 animated slideInDown" v-if="error">
                  <span class="text-danger d-block w-100 alert alert-danger">{{ error }}</span>
                </div>
                <div class="form-group">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="email">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </div>
                    <input required v-model="user.identifier" type="text" class="form-control" placeholder="Email Address" aria-label="Email Address" aria-describedby="email">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span v-on:click="toggleHidePassword" class="input-group-text" id="password">
                        <i :class="hidePassword ? 'fas fa-eye-slash': 'fas fa-eye'"></i>
                      </span>
                    </div>
                    <input required :type="hidePassword ? 'password' : 'text'" class="form-control" placeholder="Password" v-model="user.password">
                  </div>
                </div>
                <div class="d-inline float-left my-4">
                  <p-check class="p-icon p-jelly" name="rememberMe" v-model="rememberMe">
                    <i slot="extra" class="fas fa-check icon"></i>
                    Remember Me
                  </p-check>
                </div>
                <nuxt-link to='/auth/password/new' class="my-4 float-right">Forgot Password ?</nuxt-link>
                <button :disabled="loading" class="btn btn-primary hero-button form-control">
                  {{ loading ? 'Signing in ...': 'Signin' }}
                </button>
                <div class="hr-divider text-center my-5">
                  <span class="hr-divider-text">Or Signin With</span>
                </div>
                <AuthButton provider="facebook" />
                <AuthButton provider="github" />
              </form>
            </div>
          </div>

          <div class="auth-extra">
            <h2 class="text-center mb-5">Haven't Signed up yet ?</h2>
            <nuxt-link to="/auth/signup">
              <button class="btn btn-transparent">
                Create new account
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthButton from "@/components/AuthButton";
import { SET_AUTH_USER_LOCAL_LOGIN } from "@/store";

export default {
  middleware: "notAuthenticated",
  components: {
    AuthButton
  },
  data() {
    return {
      rememberMe: false,
      hidePassword: true,
      loading: false,
      error: null,
      user: {
        identifier: "",
        password: ""
      }
    };
  },
  methods: {
    toggleHidePassword() {
      this.hidePassword = !this.hidePassword;
    },
    login() {
      this.loading = true;
      this.$store
        .dispatch(SET_AUTH_USER_LOCAL_LOGIN, this.user)
        .then(response => {
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
    "user.identifier"() {
      this.error = null;
    },
    "user.username"() {
      this.error = null;
    }
  }
};
</script>
