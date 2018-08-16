<template>
  <nav class="navbar py-4 mb-3 navbar-expand-lg navbar-light navbar-custom">
      <div class="container">
        <nuxt-link class="navbar-brand" to='/'>
          <img src="https://res.cloudinary.com/bahdcoder/image/upload/v1532605976/teaching_ke0wri.svg" alt="MENTOR-TEMPLE">
          MENTOR-TEMPLE
        </nuxt-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item" v-if="isLoggedIn">
                  <nuxt-link class="nav-link" to='/dashboard'>Dashboard</nuxt-link>
              </li>
              <li class="nav-item">
                  <nuxt-link class="nav-link" to='/mentorship'>Mentorship</nuxt-link>
              </li>
              <li class="nav-item">
                  <nuxt-link class="nav-link" to='/library'>Library</nuxt-link>
              </li>
              <li class="nav-item">
                  <nuxt-link class="nav-link" to='/discussions'>Discussions</nuxt-link>
              </li>
              <li class="nav-item" v-if="!isLoggedIn">
                  <nuxt-link class="nav-link" to='/auth/signin'>Sign in</nuxt-link>
              </li>
              <li class="nav-item" v-if="!isLoggedIn">
                  <nuxt-link class="nav-link" to='/auth/signup'>Sign up</nuxt-link>
              </li>
              <li class="nav-item user-avatar" v-if="isLoggedIn">
                  <vue-gravatar :email="authUserData.user.email" />
                  <a style="cursor: pointer;" @click="logOut()" class="nav-link">Logout</a>
              </li>
            </ul>
        </div>
      </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import { UNSET_AUTH_USER } from "@/store";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      authUserData: state => state.authUserData,
      isLoggedIn: state => (state.authUserData ? true : false)
    })
  },
  methods: {
    logOut() {
      this.$store.dispatch(UNSET_AUTH_USER);
      this.$noty.info("Successfully logged out.");
      this.$router.push("/");
    }
  }
};
</script>
